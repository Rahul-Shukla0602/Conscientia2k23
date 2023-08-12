const express = require('express');
const app =express();

const userRoutes = require("./routes/User");
const eventRoutes = require('./routes/Event')
const paymentRoutes = require('./routes/Payments')
const merchPayment = require('./routes/MerchPayment')


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const {cloudinaryconnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect

database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		// origin:"https://www.conscientia.co.in",
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryconnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use('/api/v1/event',eventRoutes);
app.use('/api/v1/payment',paymentRoutes)
app.use('/api/v1/merchpayment', merchPayment);
//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

