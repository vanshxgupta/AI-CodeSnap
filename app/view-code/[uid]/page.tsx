"use client"
import AppHeader from '@/app/_components/AppHeader'
import Constants from '@/data/Constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SelectionDetail from '../_components/SelectionDetail'
import CodeEditor from '../_components/CodeEditor'

export interface RECORD {
  id: number,
  description: string,
  code: any,
  imageUrl: string,
  model: string,
  createdBy: string,
  uid: string
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState('');
  const [record, setRecord] = useState<RECORD | null>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      uid && GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async (regen = false) => {
    setIsReady(false);
    setCodeResp('');
    setLoading(true);

    const result = await axios.get('/api/wireframe-to-code?uid=' + uid);
    const resp = result?.data;
    setRecord(resp);

    if (resp?.code == null || regen) {
      GenerateCode(resp);
    } else {
      setCodeResp(resp?.code?.resp);
      setLoading(false);
      setIsReady(true);
    }

    if (resp?.error) {
      console.log("No Record Found");
    }
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    const res = await fetch('/api/ai-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: record?.description + ":" + Constants.PROMPT,
        model: record.model,
        imageUrl: record?.imageUrl
      })
    });

    if (!res.body) return;
    setLoading(false);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value)
        .replace(/```(jsx|javascript)?/g, '');
      setCodeResp(prev => prev + text);
    }

    setIsReady(true);
    UpdateCodeToDb();
  };

  useEffect(() => {
    if (codeResp !== '' && record?.uid && isReady && record?.code == null) {
      UpdateCodeToDb();
    }
  }, [codeResp, record, isReady]);

  const UpdateCodeToDb = async () => {
    const result = await axios.put('/api/wireframe-to-code', {
      uid: record?.uid,
      codeResp: { resp: codeResp }
    });
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className='grid grid-cols-1 md:grid-cols-5 p-5 gap-10'>
        <div>
          <SelectionDetail
            record={record}
            regenrateCode={() => { GetRecordInfo(true) }}
            isReady={isReady}
          />
        </div>
        <div className='col-span-4'>
          {loading ? (
            <div className='flex flex-col justify-center items-center bg-black-100 h-[80vh] rounded-xl p-10 text-center'>
              <h2 className='font-bold text-2xl mb-4 flex items-center gap-2'>
                <Loader2 className='animate-spin' />
                Analyzing the Wireframe & Design...Wait!
              </h2>
              <div className="mt-4 border border-red-400 bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm max-w-md">
                <strong>Note:</strong> In case of any error, please click on <span className="font-semibold">Regenerate Code</span>.
              </div>
            </div>
          ) : (
            <CodeEditor codeResp={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
