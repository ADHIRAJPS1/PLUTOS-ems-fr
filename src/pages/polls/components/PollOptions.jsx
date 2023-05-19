import { AddCircle, PhotoCamera } from "@mui/icons-material";
import { IconButton, ImageListItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";

const maxInputFields = 10;
const defaultNumberOfFields = 4;

const PollOptions = ({
	pollDetails,
	setPollDetails,
	isEdit,
	filePreview,
	setFilePreview,
	editDetails,
	setEditDetails,
}) => {
	const [numberOfFields, setNumberOfFields] = useState(defaultNumberOfFields);
	const [options, setOptions] = useState([]);

	const handleOptionInput = (index, e, optId) => {
		const { id, value } = e.target;
		if (!isEdit) {
			options[index] = value;
			setOptions(options);
			setPollDetails({ ...pollDetails, options });
		} else {
			const optionVal = options?.map((item, index) =>
				item.id === id ? { ...item, option: value } : item
			);

			// const updatedOpts = optionVal?.filter(
			// 	({ option: id1 }) =>
			// 		!pollDetails?.poll_option?.some(({ option: id2 }) => id2 === id1)
			// );
			setOptions(optionVal);
			setEditDetails({ ...editDetails, poll_option: optionVal });
		}
	};

	const handleOptionFile = (index, e) => {
		const { files } = e.target;
		console.log(">>>", files);
		const fileLength = Object.keys(files).length;
		if (!fileLength) return;
		// setFile({ ...file, [`option${index + 1}`]: files[0] });
		if (!isEdit) {
			setPollDetails({ ...pollDetails, [`option${index + 1}`]: files[0] });
			filePreview[index] = URL.createObjectURL(files[0]);
			setFilePreview(filePreview);
		} else {
			setEditDetails({
				...editDetails,
				[`option${index + 1}`]: files[0],
				poll_option: options,
			});
			filePreview[index] = URL.createObjectURL(files[0]);
			setFilePreview(filePreview);
		}
	};

	const generateInputField = (optNum, value) => {
		return (
			<Stack
				key={`poll_option_${optNum}`}
				direction='row'
				alignItems='center'
				spacing={2}>
				<TextField
					margin='normal'
					required
					fullWidth
					id={!isEdit ? optNum : value?.id}
					label={`Option ${optNum}`}
					name={`option_name_${optNum}`}
					value={!isEdit ? pollDetails?.option_name : value?.option}
					onChange={(e) => handleOptionInput(optNum - 1, e)}
					// autoFocus
				/>
				<IconButton
					color='primary'
					name={`option${optNum}`}
					aria-label='upload picture'
					component='label'
					onChange={(e) => handleOptionFile(optNum - 1, e)}>
					<input hidden accept='image/*' type='file' />
					<PhotoCamera />
				</IconButton>
				{filePreview.length !== 0 && (
					<ImageListItem key={optNum} sx={{ width: 100, height: 100 }}>
						<img
							src={filePreview[optNum - 1]}
							alt=''
							//{`opt-img-${optNum}`}
						/>
					</ImageListItem>
				)}
			</Stack>
		);
	};

	const generateFields = () => {
		let listOfFields = [];
		if (!isEdit) {
			for (let i = 1; i <= numberOfFields; i++) {
				listOfFields.push(generateInputField(i));
			}
		} else {
			options?.map((item, index) =>
				listOfFields.push(generateInputField(index + 1, item))
			);
		}

		return listOfFields;
	};

	const handleButtonClick = () => {
		if (numberOfFields < maxInputFields) setNumberOfFields(numberOfFields + 1);
	};

	useEffect(() => {
		if (isEdit) {
			setOptions([...pollDetails?.poll_option]);
			const images = pollDetails?.poll_option?.map(
				(item) => `${process.env.REACT_APP_EMS}/${item?.option_image}`
			);
			setFilePreview(images);
		}
	}, [isEdit]);

	return (
		<div>
			{generateFields()}

			{numberOfFields < maxInputFields && !isEdit && (
				<IconButton
					color='primary'
					aria-label='add more'
					component='label'
					onClick={handleButtonClick}>
					<AddCircle />
				</IconButton>
			)}
		</div>
	);
};

export default PollOptions;
