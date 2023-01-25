import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ReactTextareaAutosize from 'react-textarea-autosize';

const Memo = () => {
  const [memo, setMemo] = useState('');

  useEffect(() => {
    setMemo(localStorage.getItem('memo') ?? '');
  }, []);

  // 入力後1秒待ってローカルストレージにメモの内容を保存
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('memo', memo);
    }, 1000);

    return () => clearTimeout(timer);
  }, [memo]);

  return (
    <div className="absolute bottom-4 right-4">
      <ReactTextareaAutosize
        placeholder="Memo"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        maxLength={100}
        maxRows={10}
        className="min-w-[350px] bg-black/20 backdrop-blur-xl py-1 px-5 outline-none rounded-xl"
      />
      {memo && (
        <button className="absolute top-[6px] right-5 z-10">
          <MdClose className="w-5 h-5" onClick={() => setMemo('')} />
        </button>
      )}
    </div>
  );
};

export default Memo;
