import React, { useEffect, useState } from 'react'
import { Input, Button, Table } from 'antd';
import * as XLSX from 'xlsx';

const { TextArea } = Input;

export default function App() {
  const [str, setStr] = useState<string>('');
  const [arrPassword, setArrPassword] = useState<any>([]);
  const [arrIphone, setArrIphone] = useState<any>([]);
  const [num, setNum] = useState<number>(-1);
  const [is, setIs] = useState<boolean>(false);

  const [list, setList] = useState<any>([

  ]);

  const getName = (str: string, n: number) => {
    let data = [];
    data.push(str.slice(0, str.indexOf("----"))+"----miss6666");
    let newStr = str.slice(str.indexOf("----") + 4, str.length);
    setStr(newStr);
    setArrIphone(arrIphone.concat(data));
    setNum(n);
  }

  const remove = (str: string, n: number) => {
    if (num == 2) {
      let newStr = str.slice(str.indexOf("----") - 11, str.length);
      setStr(newStr);
      setNum(n);
    } else {
      let newStr = str.slice(str.indexOf("----") + 4, str.length);
      setStr(newStr);
      setNum(n);
    }


  }

  const getPassword = (str: string, n: number) => {
    let data = [];
    data.push(str.slice(0, str.indexOf("----")));
    let newStr = str.slice(str.indexOf("----") + 4, str.length);
    setStr(newStr);
    setArrPassword(arrPassword.concat(data));
    setNum(n);
  }


  const sub = () => {
    let data = str;
    if (data.indexOf("----") + "" == "-1") {
      setIs(true);
      let arr: any = []
      for (let i = 0; i < arrIphone.length; i++) {
        let obj = {
          name: '',
          password: '',
          // key: 0

        }
        obj.name = arrIphone[i];
        obj.password = arrPassword[i];
        // obj.key = i;
        arr.push(obj);
      }
      setList([...arr]);
      setNum(-1);

    } else {
      if (num == 0) {
        getName(data, 1)
      } else if (num == 1) {
        remove(data, 2);
      } else if (num == 2) {
        remove(data, 0);
      } else if (num == 3) {
        remove(data, 0);
      } else if (num == 4) {
        remove(data, 0);
      }
    }
  }

  useEffect(() => {
    sub()
  }, [num])

  return (
    <div>
      <TextArea style={{ minHeight: "200px" }} onChange={(e) => {
        setStr(e.target.value);
      }} />

      <Button type='primary' onClick={() => {
        setNum(0);
      }}>确定</Button>
      <DataList data={list} />
    </div>
  )
}

interface IDataList {
  data: any
}

const columns = [
  {
    title: '号码',
    dataIndex: 'name',
  },
  {
    title: '密码',
    dataIndex: 'password',
  }
];
function DataList({ data }: IDataList) {
  const fnExport = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    ws['!cols'] = [
      { wch: 20 },
      { wch: 30 },
    ]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '数据详情')
    XLSX.writeFile(wb, '列表详情.txt')
  }
  return (
    <div>

      <Table dataSource={data} columns={columns} />
      <Button type='primary' onClick={() => {
        fnExport();
      }}>下载</Button>
    </div>
  )
}


