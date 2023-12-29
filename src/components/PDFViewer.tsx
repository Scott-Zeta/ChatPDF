type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <embed
      type="application/pdf"
      className="w-full h-full"
      src={pdf_url}
    ></embed>
  );
};

export default PDFViewer;
