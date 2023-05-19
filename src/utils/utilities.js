export const get_current_date = () => {
	const today = new Date();
	const date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	const time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const dateTime = date + " " + time;

	return dateTime;
};

export const changeDateFormat = (fullDate) => {
	const date = fullDate.split(" ")[0];
	const time = fullDate.split(" ")[1];
	let dateArr = date.split("-");
	const [dd, mm, yyyy] = dateArr;
	const formatedDate = new Date(`${mm}-${dd}-${yyyy} ${time}`);
	return formatedDate;
};

// module.exports = {
// 	get_current_date,
// 	changeDateFormat,
// };
