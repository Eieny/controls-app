import appState from './store/app.state';
import { ButtonsControl, CountriesAutocomplete } from './components';
import './App.css';

const store = appState;

function App() {
  const { inputStore1, autocomplete1, inputStore2, autocomplete2 } = store;
  const clearInput = () => {
    inputStore1.value = '';
  };
  const setHello = () => {
    inputStore1.value = 'Hello world!';
  };
  const alertNumber = () => {
    if (!isNaN(Number(inputStore2.value))) {
      alert(inputStore2.value);
    }
  };
  const alertString = () => {
    alert(inputStore2.value);
  };

  return (
    <div>
      <div className='control-container'>
        <h2>Контрол-Автокомплит</h2>
        <div>
          <h3>Тестовый контрол с 4 подсказками</h3>
          <CountriesAutocomplete store={autocomplete1} maxOptions={4} />
        </div>
        <div>
          <h3>Тестовый контрол с 10 подсказками</h3>
          <CountriesAutocomplete store={autocomplete2} maxOptions={10} />
        </div>
      </div>
      
      <div className='control-container'>
        <h2>Контрол с кнопками</h2>
        <div>
          <h3>Тестовый контрол 1</h3>
          <ButtonsControl
            rightButtons={[
              {
                label: 'Очистить',
                onClick: clearInput,
              },
              {
                label: 'Hello World!',
                onClick: setHello,
              },
            ]}
            store={inputStore1}
          />
        </div>
        
        <div>
          <h3>Тестовый контрол 2</h3>
          <ButtonsControl
            leftButtons={[
              {
                label: 'Вывести число',
                onClick: alertNumber,
              },
            ]}
            rightButtons={[
              {
                label: 'Вывести текст',
                onClick: alertString,
              },
            ]}
            store={inputStore2}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
