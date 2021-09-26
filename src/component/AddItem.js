import React, { useState, useEffect } from 'react'
import * as yup from 'yup'


function AddItem() {
	const [formState, setFormState] = useState({
        location: '',
		name: '',
		description: '',
		price: ''
	})

	const [errors, setErrors] = useState({
        location: '',
		name: '',
		description: '',
		price: ''
	})

	const formSchema = yup.object().shape({
        location: yup.string().oneOf(["Kenya", "Uganda", "Rwanda", "Tanzania"],"Please Select your location").required(),
		name: yup.string().required("Please provide the item name"),
		description: yup.string().required("Please provide the item detail"),
		price: yup.number().typeError('Please provide the item price').positive("Price must be greater than zero").required()
	})

	const validateData = (e) => {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) => {
				setErrors({
					...errors,
					[e.target.name]: ''
				})
			})
			.catch(err => { setErrors({...errors,[e.target.name]: err.errors[0]})})
			
	}

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => {
			setButtonDisable(!valid)
		})
	})

	const [buttonDisable, setButtonDisable] = useState(true)


	const handleChange = (e) => {
		e.persist()
		const formData = {
			...formState,
			[e.target.name]: e.target.value
		};
		validateData(e)
		setFormState(formData)
	};

	const handleSubmit = (e) => {
		e.preventDefault()
	}
	

	return (
		<div>
			<form className = 'form-div' onSubmit={handleSubmit}>
            <h1>Add Item</h1>
                <label htmlFor="location">Market Location: 
                <br/>
					<select
						name="location"
						value={formState.location}
						onChange={handleChange}
					>
						<option value="">--select one--</option>
						<option value="Kenya">Kenya</option>
						<option value="Uganda">Uganda</option>
						<option value="Rwanda">Rwanda</option>
						<option value="Tanzania">Tanzania</option>
					</select>
                    <p>{errors.location}</p>
				</label>
				<label htmlFor="name">Item Name: 
                <br/>
					<input
						type="text"
						name="name"
						value={formState.name}
						onChange={handleChange}
					/>
					<p>{errors.name}</p>
				</label>

				<label htmlFor="description"> Description: 
                <br/>
					<textarea
						name="description"
						value={formState.description}
						onChange={handleChange}
					>
					</textarea>
                    <p>{errors.description}</p>
				</label>
				<label htmlFor="price">Price: 
                <br/>
					<input
						type="number"
						name="price"
						value={formState.price}
						onChange={handleChange}/>
                        <p>{errors.price}</p>
				</label>
				<button disabled={buttonDisable} type="submit">Submit</button>

			</form>

		</div>
	)
}

export default AddItem