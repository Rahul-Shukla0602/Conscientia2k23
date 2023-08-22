exports.accomodationSuccessEmail = (name, data) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Payment Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
             <a href="https://www.conscientia.co.in/"><img class="logo" src="https://res.cloudinary.com/dwdwnfcnx/image/upload/v1690132004/Conscientiateam/g85golybsz6bfzowafyf.png"
                      alt="conscientia2k23"></a>
              <div class="message">Accomodation Registration Confirmation</div>
              <div class="body">
                  <p>Dear ${name},</p>
                  <p>We have successfully registered your accomodation with the following details.</p>.
                  <p>
                  <span class='highlight'>Total Person: ${data.totalperson}</span><br/>
                  <span class='highlight'>Men: ${data.men}</span><br/>
                  <span class='highlight'>Women: ${data.women}</span><br/>
                  <span class='highlight'>Minor: ${data.minor}</span><br/>
                  <span class='highlight'>Is minor included a girl?: ${data.isminorgirl}</span><br/>
                  <span class='highlight'>Checkin: ${data.checkIn}</span><br/>
                  <span class='highlight'>Checkout: ${data.checkOut}</span><br/>
                  <span class='highlight'>Days: ${data.days}</span><br/>
                  </p>
                  <p>Person Details: <br/>
                  ${data.details.map((value,i)=>{
                    if(i>=1){
                        return (
                            `Person ${i} <br>
                            Name: ${value.name}<br>
                            Phone: ${value.phone}<br>
                            Email: ${value.email}<br>
                            Aadhar: ${value.aadhar}<br>`
                        )
                    }
                  })}</p>
                  <p>ThankYou</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:info@Conscientiateamiist@gmail.com">Conscientiateamiist@gmail.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`
  }