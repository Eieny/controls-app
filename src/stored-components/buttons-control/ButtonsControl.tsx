import { observer } from 'mobx-react-lite';
import InputStore from '../../store/input.state';
import ButtonsControl, { ButtonItems } from '../../components/buttons-control/ButtonsControl';

type Props = {
  leftButtons?: ButtonItems[];
  rightButtons?: ButtonItems[];
  store: InputStore;
};

const StoredButtonsControl = observer((props: Props) => {
  const { leftButtons, rightButtons, store } = props;
  const { value } = store;

  const handleChange = (str: string) => {
    store.value = str;
  };

  return (
    <ButtonsControl
      value={value}
      onChange={handleChange}
      leftButtons={leftButtons}
      rightButtons={rightButtons}
    />
  );
});

export default StoredButtonsControl;
