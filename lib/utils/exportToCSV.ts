import {json2csv} from "json-2-csv";

export const exportToCSV = (csvData: any, fileName: string) => {
    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}