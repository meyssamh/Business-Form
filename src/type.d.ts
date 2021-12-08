interface AppValidatorState {
	[key: string]: boolean
	firstname: boolean;
	lastname: boolean;
	birthdate: boolean;
	businessEmail: boolean;
	privateEmail: boolean;
	primaryPhone: boolean;
	mobilePhone: boolean;
	businessPhone: boolean;
	privatePhone: boolean;
	street: boolean;
	zip: boolean;
	city: boolean;
};

interface AppHelperText {
	[key: string]: string
	firstname: string;
	lastname: string;
	birthdate: string;
	businessEmail: string;
	privateEmail: string;
	primaryPhone: string;
	mobilePhone: string;
	businessPhone: string;
	privatePhone: string;
	street: string;
	zip: string;
	city: string;
};

interface AppState {
	[key: string]: string | string[] | boolean | AppValidatorState | AppHelperText;
	firstname: string;
	lastname: string;
	birthdate: string;
	emailNames: string[];
	emailChildren: string[];
	primaryEmailType: string;
	businessEmail: string;
	privateEmail: string;
	phoneNames: string[];
	phoneChildren: string[];
	primaryPhoneType: string;
	primaryPhone: string;
	mobilePhone: string;
	businessPhone: string;
	privatePhone: string;
	street: string;
	zip: string;
	city: string;
	country: string;
	inputValidators: AppValidatorState;
	inputHelperTexts: AppHelperText;
};

interface PhoneProps {
	type: string;
	radioName: string;
	radioValue: string[];
	name: string[];
	children: string[];
	primaryPhone: string;
	mobilePhone: string;
	businessPhone: string;
	privatePhone: string;
	onChangeRadio: React.ChangeEventHandler<HTMLInputElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	onCheckedRadio: string;
	error: boolean[];
	helperText: string[];
};

interface EmailProps {
	type: string;
	radioName: string;
	radioValue: string[];
	name: string[];
	children: string[];
	businessEmail: string;
	privateEmail: string;
	onChangeRadio: React.ChangeEventHandler<HTMLInputElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	onCheckedRadio: string;
	error: boolean[];
	helperText: string[];
};

interface CountryProps {
	data: { [key: string]: string };
	onChangeSelect: React.ChangeEventHandler<HTMLInputElement>;
	selectedCountry: string;
	required: boolean;
};

type Color = "primary" | "secondary" | "default" | undefined;

interface ButtonProps {
	variant: "text" | "outlined" | "contained" | undefined;
	children: string;
	onButtonClick: React.MouseEventHandler<HTMLElement>;
	color: Color | undefined;
};

interface TextProps {
	type: string;
	radioName?: string;
	radioValue?: string
	name: string;
	children: string;
	value: string;
	onChangeRadio?: React.ChangeEventHandler<HTMLInputElement>;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	onChecked?: string;
	placeholder?: string;
	error?: boolean;
	required: boolean;
	helperText: string;
};

type TextRef = HTMLParagraphElement;

type EmailRef = HTMLParagraphElement;

type PhoneRef = HTMLParagraphElement;