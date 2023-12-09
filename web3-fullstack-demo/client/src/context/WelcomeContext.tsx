import {
  createContext,
  FunctionComponent,
  useState
} from 'react';

export interface SendFormProperties {
  addressTo?: string;
  amount?: number;
  keyword?: string;
  message?: string;
}
const INIT_FORM_PARAMS: SendFormProperties = {
  addressTo: '',
  amount: 0,
  keyword: '',
  message: ''
};

export interface WelcomeContextValue {
  form: SendFormProperties;
  setFormItem?: (value: string, field: keyof SendFormProperties) => void;
}
const INIT_CONTEXT_VALUE: WelcomeContextValue = {
  form: INIT_FORM_PARAMS
};

const WelcomeContext = createContext<WelcomeContextValue>(INIT_CONTEXT_VALUE);

const WelcomeContextProvider: FunctionComponent<JSX.ElementChildrenAttribute> = ({ children }) => {
  const [form, setForm] = useState<SendFormProperties>(INIT_FORM_PARAMS);

  const setFormItem: WelcomeContextValue['setFormItem'] = (value, field) =>
    setForm(preForm => ({ ...preForm, [field]: value }));

  return (
    <WelcomeContext.Provider value={{ form, setFormItem }}>{children}</WelcomeContext.Provider>
  );
};

export { WelcomeContext, WelcomeContextProvider };
