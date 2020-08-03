
//数组拆分函数，接收两个参数，data是原数组，pageSize是拆分后每个数组的长度（不能整除则最后一个数组的长度由余数决定，返回一个按照pageSize拆分好的数组dataSpliced,dataSpliced[i]是拆分好的第i个数组）
export default function splitData(data, pageSize=data.length) {
    let pageNum = Math.ceil(data.length / pageSize);
    let dataSource = [];
    let copyData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < pageNum - 1; i++) {
        let newPart = copyData.slice(i * pageSize, i * pageSize + pageSize);
        dataSource[i] = newPart;
    }
    let lastPart = copyData.slice((pageNum - 1) * pageSize);
    dataSource.push(lastPart);
    return dataSource;
}
//用法实例：
// let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let pageSize = 4;
// console.log(splitData(data,pageSize))