import { Autocomplete, ButtonsControl } from './components';
import './App.css';
import { useState } from 'react';

const ITEMS = [
  {
    id: 0,
    name: 'abc',
    fullName: 'ABC',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/50px-Flag_of_Australia.svg.png',
  },
  {
    id: 1,
    name: 'abc2',
    fullName: 'ABC2',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/50px-Flag_of_Australia.svg.png',
  },
  {
    id: 2,
    name: 'abc3',
    fullName: 'ABC3',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/50px-Flag_of_Australia.svg.png',
  },
  {
    id: 3,
    name: 'abc4',
    fullName: 'ABC4',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/50px-Flag_of_Australia.svg.png',
  },
];

function App() {
  const [input, setInput] = useState('');
  return (
    <div>
      <ButtonsControl
        onChange={() => {}}
        value=''
        leftButtons={[{ label: '1', onClick: () => {} }]}
        rightButtons={[
          {
            label: 'right',
            onClick: () => {},
          },
        ]}
      />

      <Autocomplete
        value={input}
        onChange={setInput}
        maxOptions={2}
        options={ITEMS}
        getOptionLabel={item => item.name}
        renderOption={item => (
          <>
            <img src={item.flag} />
            <span>{item.name}</span>
            <span>{item.fullName}</span>
          </>
        )}
      />
    </div>
  );
}

export default App;
