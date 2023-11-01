'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const [iframeTimeoutId, setIframeTimeoutId] = useState<any>(); // a pointer to the interval
  const [intervalTime, setIntervalTime] = useState<number>(1000 * 3); //start from 3 seconds
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFail, setIsFail] = useState<boolean>(false);
  const iframeRef: any = useRef(null);

  const getIframeLink = useCallback(() => {
    return `https://docs.google.com/gview?url=${pdf_url}&embedded=true`;
  }, [pdf_url]);

  const handleError = () => {
    if (intervalTime < 10001) {
      setIntervalTime((t) => t + 1000);
    } else {
      clearInterval(iframeTimeoutId);
      setIsLoading(false);
      setIsFail(true);
      return;
    }
    updateIframeSrc(); //if failed, try again with new interval time
  };

  const updateIframeSrc = useCallback(() => {
    if (iframeRef.current) {
      iframeRef!.current!.src = getIframeLink();
    }
  }, [getIframeLink]);

  useEffect(() => {
    const intervalId = setInterval(updateIframeSrc, intervalTime);
    setIframeTimeoutId(intervalId);
    return () => clearInterval(intervalId);
  }, [updateIframeSrc, intervalTime]);

  function iframeLoaded() {
    clearInterval(iframeTimeoutId);
    setIsLoading(false);
  }
  return (
    <>
      {isLoading && <p>Loading your document preview...</p>}
      {!isFail && (
        <iframe
          src={getIframeLink()}
          ref={iframeRef}
          onLoad={iframeLoaded}
          onError={handleError}
          className="w-full h-full"
        ></iframe>
      )}
      {isFail && (
        <p>
          We can not load your document preview, perhaps because the file is too
          large or Google preview Service Issue, try again if you want.
        </p>
      )}
    </>
  );
};

export default PDFViewer;
