'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const [iframeTimeoutId, setIframeTimeoutId] = useState<any>();
  const iframeRef: any = useRef(null);

  const getIframeLink = useCallback(() => {
    return `https://docs.google.com/gview?url=${pdf_url}&embedded=true`;
  }, [pdf_url]);

  const updateIframeSrc = useCallback(() => {
    if (iframeRef.current) {
      iframeRef!.current!.src = getIframeLink();
    }
  }, [getIframeLink]);

  useEffect(() => {
    const intervalId = setInterval(updateIframeSrc, 1000 * 3);
    setIframeTimeoutId(intervalId);
  }, [updateIframeSrc]);

  function iframeLoaded() {
    clearInterval(iframeTimeoutId);
  }
  return (
    <iframe
      src={getIframeLink()}
      ref={iframeRef}
      onLoad={iframeLoaded}
      onError={updateIframeSrc}
      className="w-full h-full"
    ></iframe>
  );
};

export default PDFViewer;
