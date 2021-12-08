import React, { ChangeEvent, Component, MouseEvent, RefObject } from 'react';
import { Grid, Divider, Typography, Box, Paper } from '@material-ui/core';

import Input from './components/Input/Input';
import Email from './components/Email/Email';
import Phone from './components/Phone/Phone';
import Country from './components/Country/Country';
import Button from './components/Button/Buttons';
import data from '@/data/ISO3166-1.alpha2.json';
import "./App.css";

class App extends Component<any, AppState> {

	constructor(
		props: any,
		private emailFormat: RegExp,
		private firstnameRef: RefObject<HTMLParagraphElement>,
		private lastnameRef: RefObject<HTMLParagraphElement>,
		private birthdateRef: RefObject<HTMLParagraphElement>,
		private emailRef: RefObject<HTMLParagraphElement>,
		private phoneRef: RefObject<HTMLParagraphElement>,
		private streetRef: RefObject<HTMLParagraphElement>,
		private zipRef: RefObject<HTMLParagraphElement>,
		private cityRef: RefObject<HTMLParagraphElement>,
	) {
		super(props);

		this.state = {
			firstname: "",
			lastname: "",
			birthdate: "",
			emailNames: ["businessEmail", "privateEmail"],
			emailChildren: ["Business", "Private"],
			primaryEmailType: "Business",
			businessEmail: "",
			privateEmail: "",
			phoneNames: ["primaryPhone", "mobilePhone", "businessPhone", "privatePhone"],
			phoneChildren: ["Primary", "Mobile", "Business", "Private"],
			primaryPhoneType: "Primary",
			primaryPhone: "",
			mobilePhone: "",
			businessPhone: "",
			privatePhone: "",
			street: "",
			zip: "",
			city: "",
			country: "US",
			inputValidators: {
				firstname: false,
				lastname: false,
				birthdate: false,
				businessEmail: false,
				privateEmail: false,
				primaryPhone: false,
				mobilePhone: false,
				businessPhone: false,
				privatePhone: false,
				street: false,
				zip: false,
				city: false,
			},
			inputHelperTexts: {
				firstname: "",
				lastname: "",
				birthdate: "",
				businessEmail: "",
				privateEmail: "",
				primaryPhone: "",
				mobilePhone: "",
				businessPhone: "",
				privatePhone: "",
				street: "",
				zip: "",
				city: "",
			},
		};

		this.firstnameRef = React.createRef();
		this.lastnameRef = React.createRef();
		this.birthdateRef = React.createRef();
		this.emailRef = React.createRef();
		this.phoneRef = React.createRef();
		this.streetRef = React.createRef();
		this.zipRef = React.createRef();
		this.cityRef = React.createRef();

		this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
		this.onRadioButtonChangeHandler = this.onRadioButtonChangeHandler.bind(this);
		this.onChangeSelectHandler = this.onChangeSelectHandler.bind(this);
		this.onResetHandler = this.onResetHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);

		emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	};

	/**
	 * changes the input values in state
	 * 
	 * @param {ChangeEvent<HTMLInputElement>} event - event object of input element
	 */
	onTextChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		const target = event.target;
		let inputValidators = { ...this.state.inputValidators };
		let inputHelperTexts = { ...this.state.inputHelperTexts };

		if (target.type === "email") {
			
			if (target.value.length == 0 && target.required == true) {
				inputValidators[target.name] = true;
				inputHelperTexts[target.name] = "This field is required!";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			// checks if the email inputs are filled correctly
			} else if (!target.value.match(this.emailFormat) && target.value.length > 0) {
				inputValidators[target.name] = true;
				inputHelperTexts[target.name] = "Invalid Email address!";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
				console.log(inputValidators);
			} else {
				inputValidators[target.name] = false;
				inputHelperTexts[target.name] = "";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			}
		} else if (target.type === "tel") {
			const value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
			
			// checks if the phone fields are filled correctly
			if (target.value.length == 0 && target.required == true) {
				inputValidators[target.name] = true;
				inputHelperTexts[target.name] = "This field is required!";
				this.setState({
					[target.name]: value,
					inputValidators,
					inputHelperTexts
				});
			} else {
				inputValidators[target.name] = false;
				inputHelperTexts[target.name] = "";
				this.setState({
					[target.name]: value,
					inputValidators,
					inputHelperTexts
				});
			}
		} else if (target.type === "date") {
			// checks if the date is not bigger than the current date
			if (Date.now() <= Date.parse(target.value)) {
				inputValidators[target.name] = true;
				inputHelperTexts[target.name] = "Invalid Birthdate!";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			} else {
				inputValidators[target.name] = false;
				inputHelperTexts[target.name] = "";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			}
		} else {
			// checks if the required field is not empty
			if (target.value.length == 0) {
				inputValidators[target.name] = true;
				inputHelperTexts[target.name] = "This field is required!";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			} else {
				inputValidators[target.name] = false;
				inputHelperTexts[target.name] = "";
				this.setState({
					[target.name]: target.value,
					inputValidators,
					inputHelperTexts
				});
			}
		}
	};

	/**
	 * checks if the input element is empty or not and then shows an error
	 * 
	 * @param {ChangeEvent<HTMLInputElement>} event - event object of the input element
	 */
	textInputValidator(event: ChangeEvent<HTMLInputElement>): void {
		const name = event.target.name;
		let inputValidators = { ...this.state.inputValidators };

		if (typeof name === "string" && this.state[name] === "") {
			inputValidators[name] = true;
			this.setState({
				inputValidators
			})
		} else {
			inputValidators[name] = false;
			this.setState({
				inputValidators
			})
		}
	};

	/**
	 * changes value of the checked radio button for email and phone
	 * 
	 * @param {ChangeEvent<HTMLInputElement>} event - event object of radio button
	 */
	onRadioButtonChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		const target = event.target;
		let inputValidators = {
			...this.state.inputValidators,
			businessEmail: false,
			privateEmail: false,
			primaryPhone: false,
			mobilePhone: false,
			businessPhone: false,
			privatePhone: false,
		};
		let inputHelperTexts = {
			...this.state.inputHelperTexts,
			businessEmail: "",
			privateEmail: "",
			primaryPhone: "",
			mobilePhone: "",
			businessPhone: "",
			privatePhone: "",
		};

		if (target.name === "email") {
			this.setState({
				primaryEmailType: target.value,
				inputValidators,
				inputHelperTexts
			});
		} else {
			this.setState({
				primaryPhoneType: target.value,
				inputValidators,
				inputHelperTexts
			});
		}
	};

	/**
	 * changes value of the country in state
	 * 
	 * @param {ChangeEvent<HTMLInputElement>} event - event of the select item
	 */
	onChangeSelectHandler(event: ChangeEvent<HTMLInputElement>): void {
		const value = event.target.value;
		this.setState({
			country: value
		});
	};

	/**
	 * resets the state
	 * 
	 * @param {MouseEvent<HTMLButtonElement>} event - event object of reset button
	 */
	onResetHandler(event: MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		this.setState({
			firstname: "",
			lastname: "",
			birthdate: "",
			emailNames: ["businessEmail", "privateEmail"],
			emailChildren: ["Business", "Private"],
			primaryEmailType: "Business",
			businessEmail: "",
			privateEmail: "",
			phoneNames: ["primaryPhone", "mobilePhone", "businessPhone", "privatePhone"],
			phoneChildren: ["Primary", "Mobile", "Business", "Private"],
			primaryPhoneType: "Primary",
			primaryPhone: "",
			mobilePhone: "",
			businessPhone: "",
			privatePhone: "",
			street: "",
			zip: "",
			city: "",
			country: "US",
			inputValidators: {
				firstname: false,
				lastname: false,
				birthdate: false,
				businessEmail: false,
				privateEmail: false,
				primaryPhone: false,
				mobilePhone: false,
				businessPhone: false,
				privatePhone: false,
				street: false,
				zip: false,
				city: false,
			},
			inputHelperTexts: {
				firstname: "",
				lastname: "",
				birthdate: "",
				businessEmail: "",
				privateEmail: "",
				primaryPhone: "",
				mobilePhone: "",
				businessPhone: "",
				privatePhone: "",
				street: "",
				zip: "",
				city: "",
			},
		});
	};

	/**
	 * validates at submit if the input elements are filled and if not will scroll and show
	 * an error to user
	 * 
	 * @param {string} name - name of the input field
	 * @param {RefObject<HTMLParagraphElement>} ref - reference of the input element
	 */
	inputValidator(name: string, ref: RefObject<HTMLParagraphElement>): void {
		let inputValidators = { ...this.state.inputValidators };
		let inputHelperTexts = { ...this.state.inputHelperTexts };
		(ref.current as HTMLParagraphElement).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
		inputValidators[name] = true;
		inputHelperTexts[name] = "This field is required!";
		this.setState({
			inputValidators,
			inputHelperTexts
		});
	}

	/**
	 * submits all the input data and prints it to the console
	 * 
	 * @param {MouseEvent<HTMLButtonElement>} event - event object of submit button
	 */
	onSubmitHandler(event: MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		let inputValidators = { ...this.state.inputValidators };
		let inputHelperTexts = { ...this.state.inputHelperTexts };
		const primaryPhoneType = this.state.primaryPhoneType.toLowerCase() + "Phone";

		// checks if the chosen primary email is filled correctly
		if (
			!this.state.businessEmail.match(this.emailFormat) &&
			this.state.primaryEmailType === "Business"
		) {
			(this.emailRef.current as HTMLParagraphElement).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
			inputValidators.businessEmail = true;
			inputHelperTexts.businessEmail = "Invalid Email address!";
			this.setState({
				inputValidators,
				inputHelperTexts
			});
			return;
		} else if (
			!this.state.privateEmail.match(this.emailFormat) &&
			this.state.primaryEmailType === "Private"
		) {
			(this.emailRef.current as HTMLParagraphElement).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
			inputValidators.privateEmail = true;
			inputHelperTexts.privateEmail = "Invalid Email address!";
			this.setState({
				inputValidators,
				inputHelperTexts
			});
			return;
		}

		// the data that have to be shown in console
		const data: {
			[key: string]: string |
			{ [key: string]: string | boolean }[]
		} = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			birthdate: this.state.birthdate,
			email: [
				{
					type: "business",
					value: this.state.businessEmail,
					primary: this.state.primaryEmailType === "Business" ? true : false
				},
				{
					type: "private",
					value: this.state.privateEmail,
					primary: this.state.primaryEmailType === "Private" ? true : false
				},
			],
			phone: [
				{
					type: "primary",
					value: this.state.primaryPhone,
					primary: this.state.primaryPhoneType === "Primary" ? true : false
				},
				{
					type: "mobile",
					value: this.state.mobilePhone,
					primary: this.state.primaryPhoneType === "Mobile" ? true : false
				},
				{
					type: "business",
					value: this.state.businessPhone,
					primary: this.state.primaryPhoneType === "Business" ? true : false
				},
				{
					type: "private",
					value: this.state.privatePhone,
					primary: this.state.primaryPhoneType === "Private" ? true : false
				},
			],
			street: this.state.street,
			zip: this.state.zip,
			city: this.state.city,
			country: this.state.country
		};

		// checkes if the input fields are filled
		switch ("") {
			case this.state.firstname:
				this.inputValidator("firstname", this.firstnameRef);
				break;
			case this.state.lastname:
				this.inputValidator("lastname", this.lastnameRef);
				break;
			case this.state.birthdate:
				this.inputValidator("birthdate", this.birthdateRef);
				break;
			case this.state[primaryPhoneType]:
				this.inputValidator(primaryPhoneType, this.phoneRef);
				break;
			case this.state.street:
				this.inputValidator("street", this.streetRef);
				break;
			case this.state.zip:
				this.inputValidator("zip", this.zipRef);
				break;
			case this.state.city:
				this.inputValidator("city", this.cityRef);
				break;
			default:
				console.log(JSON.stringify(data));
		}
	};

	render() {

		return (
			<main className={"main"}>
				<Box my={10}>
					<Grid
						container
					>
						<Grid
							item
							xs={1}
							sm={2}
							md={3}
						>
						</Grid>
						<Grid
							item
							xs={10}
							sm={8}
							md={6}
						>
							<Paper elevation={6}>
								<form>
									<Box py={1.5}>
										<Typography
											variant={"h5"}
											align={"center"}
										>
											Business Form
										</Typography>
									</Box>
									<Divider variant={"middle"} />
									<Input
										type={"text"}
										name={"firstname"}
										children={"Firstname"}
										value={this.state.firstname}
										onChangeInput={this.onTextChangeHandler}
										placeholder={"Max"}
										error={this.state.inputValidators.firstname}
										required={true}
										helperText={this.state.inputHelperTexts.firstname}
										ref={this.firstnameRef}
									/>
									<Input
										type={"text"}
										name={"lastname"}
										children={"Lastname"}
										value={this.state.lastname}
										onChangeInput={this.onTextChangeHandler}
										placeholder={"Mustermann"}
										error={this.state.inputValidators.lastname}
										required={true}
										helperText={this.state.inputHelperTexts.lastname}
										ref={this.lastnameRef}
									/>
									<Input
										type={"date"}
										name={"birthdate"}
										children={"Birthdate"}
										value={this.state.birthdate}
										onChangeInput={this.onTextChangeHandler}
										error={this.state.inputValidators.birthdate}
										required={true}
										helperText={this.state.inputHelperTexts.birthdate}
										ref={this.birthdateRef}
									/>
									<Divider variant={"middle"} />
									<Email
										type={"email"}
										radioName={"email"}
										name={this.state.emailNames}
										radioValue={this.state.emailChildren}
										children={this.state.emailChildren}
										onChangeRadio={this.onRadioButtonChangeHandler}
										onChangeInput={this.onTextChangeHandler}
										onCheckedRadio={this.state.primaryEmailType}
										businessEmail={this.state.businessEmail}
										privateEmail={this.state.privateEmail}
										error={
											[
												this.state.inputValidators.businessEmail,
												this.state.inputValidators.privateEmail
											]
										}
										helperText={
											[
												this.state.inputHelperTexts.businessEmail,
												this.state.inputHelperTexts.privateEmail
											]
										}
										ref={this.emailRef}
									/>
									<Divider variant={"middle"} />
									<Phone
										type={"tel"}
										radioName={"tel"}
										name={this.state.phoneNames}
										radioValue={this.state.phoneChildren}
										children={this.state.phoneChildren}
										onChangeRadio={this.onRadioButtonChangeHandler}
										onChangeInput={this.onTextChangeHandler}
										onCheckedRadio={this.state.primaryPhoneType}
										primaryPhone={this.state.primaryPhone}
										mobilePhone={this.state.mobilePhone}
										businessPhone={this.state.businessPhone}
										privatePhone={this.state.privatePhone}
										error={
											[
												this.state.inputValidators.primaryPhone,
												this.state.inputValidators.mobilePhone,
												this.state.inputValidators.businessPhone,
												this.state.inputValidators.privatePhone
											]
										}
										helperText={
											[
												this.state.inputHelperTexts.primaryPhone,
												this.state.inputHelperTexts.mobilePhone,
												this.state.inputHelperTexts.businessPhone,
												this.state.inputHelperTexts.privatePhone
											]
										}
										ref={this.phoneRef}
									/>
									<Divider variant={"middle"} />
									<Input
										type={"text"}
										name={"street"}
										children={"Street"}
										value={this.state.street}
										onChangeInput={this.onTextChangeHandler}
										placeholder={"First Street"}
										error={this.state.inputValidators.street}
										required={true}
										helperText={this.state.inputHelperTexts.street}
										ref={this.streetRef}
									/>
									<Input
										type={"number"}
										name={"zip"}
										children={"Zip"}
										value={this.state.zip}
										onChangeInput={this.onTextChangeHandler}
										placeholder={"12345"}
										error={this.state.inputValidators.zip}
										required={true}
										helperText={this.state.inputHelperTexts.zip}
										ref={this.zipRef}
									/>
									<Input
										type={"text"}
										name={"city"}
										children={"City"}
										value={this.state.city}
										onChangeInput={this.onTextChangeHandler}
										placeholder={"New York"}
										error={this.state.inputValidators.city}
										required={true}
										helperText={this.state.inputHelperTexts.city}
										ref={this.cityRef}
									/>
									<Country
										selectedCountry={this.state.country}
										data={data}
										onChangeSelect={this.onChangeSelectHandler}
										required={true}
									/>
									<br />
									<Box mx={2.5} my={0.6}>
										<Typography
											variant={"body2"}
											className={"required-text"}
											align={"right"}
										>
											* required
										</Typography>
									</Box>
									<Divider variant={"middle"} />
									<Box
										display={"flex"}
										flexDirection={"row"}
										alignItems={"center"}
										justifyContent={"space-between"}
										p={2.5}
									>
										<Button
											children={"Reset"}
											variant={"text"}
											onButtonClick={this.onResetHandler}
											color={"secondary"}
										/>
										<Button
											children={"Submit"}
											variant={"contained"}
											onButtonClick={this.onSubmitHandler}
											color={"primary"}
										/>
									</Box>
								</form>
							</Paper>
						</Grid>
						<Grid
							item
							xs={1}
							sm={2}
							md={3}
						>
						</Grid>
					</Grid>
				</Box>
			</main>
		);
	}
};

export default App;