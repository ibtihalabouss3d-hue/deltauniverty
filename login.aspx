

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>
	DELTA-PORTAL
</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><link href="assets/login/login.css" rel="stylesheet" /><link rel="stylesheet" href="assets/css/app.v2.css" type="text/css" /><link rel="stylesheet" href="assets/js/fuelux/fuelux.css" type="text/css" /><link rel="stylesheet" href="assets/css/landing.css" type="text/css" /><link rel="stylesheet" href="assets/css/app.css" type="text/css" cache="false" />
    <script src="assets/js/jquery.js"></script>
    <script src="assets/login/login.js"></script>
    <style>
        .appname .appnamecontainer {
            text-align: left;
        }

        #message {
            color: crimson;
            margin-left: 15px;
        }

        .captach {
            margin-top: 0px;
            margin-bottom: 18px;
            width:290px;
            text-align: center;
        }

            .captach img {
                width: 230px;
                padding: 5px 30px;
            }

        .fa-check-circle:before {
            content: "\f058";
        }

        #verifycode {
            margin: 5%
        }
        .options{
            text-align:left;
            width:300px;
            margin-top:18px;
            margin-bottom:15px;
        }

        .radio-inline
{
	padding-left: 0px;
    margin-right:5px;
    margin-left:0px;
}
        .choice span::after{
            top:1px;
        }

         @media (max-width: 992px) {
            .options {
                text-align: left;
                width: 300px;
                margin: 0 auto;
                padding: 20px 0 20px 10px;
            }

            .radio-inline {
                padding-left: 0px;
                margin-right: 5px;
                margin-left: 4px !important;
            }

            .captach {
            width:270px;
        }
        }
    </style>
</head>

<body>


    <section class="vbox">
        <header class="header">
            <img src="/assets/img/new-logo.png" />
            <div class="title">DULMS</div>
        </header>
        <div class="spliter">
            <div id="orange" class="orange"></div>
            <div class="blue"></div>
        </div>

        <section class="hbox">
           
            <form method="post" action="./login.aspx" id="form1" class="form">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="BJ+z/zRReVhBlUNqit3t+jxnX3GbaIjInCChY5pTiHDGRDYeVw6eQ4tpf5TIBtrrNfqpRnf0maqZwjJRO9bJxlBLajzrbPvXUrm3wdInYI8/oifslDFOaRP2RhKSGEh4JZ6UY9bYi/C5gcoBF9JzzzcQR3JQUxsOpAmBV8HUZMXCvNC5aoYOeZBU3FCvSONO" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="C2EE9ABB" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="d152SX4MtbyR31suGrx9FfqLygmqZACBQfd7MBLFwBAEzxYwma1bvBaSGnvgBAc58iIA/Wgx1QzSc6Xcbep/dcGlNhJz44iqwEYS98zPuMzQNUsJY+RzH7yjn6YeJJEqqUdPVA8Le3Ii0/x/OmA9YfjsAiZjyi6J2JmFT7puaEJARzgmSf3VEQ4/zUKs2B2d1QquLhDnNpoKrUsaL0whEY1b7w/FQphrpZA33jFUDJTDPxez8jlXcIgLNsQ76fJI" />
</div>

                <div class="input_field">
                    <span><i class="fa fa-user"></i></span>
                    <input name="txtname" type="text" id="txtname" placeholder="User Name" />
                </div>
                <div class="options">
                    <div class="radio-inline ">
                        <div class="choice">
                            <span class="checked">
                                <input id="rd1" type="radio" name="type" value="1" checked="checked" />
                            </span>
                        </div>
                        Student
                    </div>
                      <div class="radio-inline ">
                        <div class="choice">
                            <span>
                                <input id="rd4" type="radio" name="type" value="6" />
                            </span>
                        </div>
                        Graduate
                    </div>
                    <div class="radio-inline ">
                        <div class="choice">
                            <span>
                                <input id="rd3" type="radio" name="type" value="3" />
                            </span>
                        </div>
                        Parent
                    </div>
                    <div class="radio-inline ">
                        <div class="choice">
                            <span>
                                <input id="rd2" type="radio" name="type" value="2" />
                            </span>
                        </div>
                        Staff
                    </div>
                </div>
                <div class="input_field">
                    <span><i class="fa fa-asterisk"></i></span>
                    <input name="txtPass" type="password" id="txtPass" placeholder="Password" />
                </div>
              
              
                <div class="forget"><a href="/PasswordRecovery/Verification">Forget your password?</a></div>
                <input type="submit" name="Button1" value="Login" id="Button1" name="Login" />
                <div class="error">
                    
                </div>
                <input type="hidden" value="" />
                

                <div class="credit">
                    <p>
                        Powered by Delta University, All Rights Reserved ©2024.
                    </p>
                    <div>
                        <a title="Website" href="https://www.deltauniv.edu.eg/new/" target="_blank">
                            <img src="/assets/login/img/website.png" />
                        </a>
                        <a title="Facebook" href="https://www.facebook.com/deltauniv/" target="_blank">
                            <img src="/assets/login/img/facebook.png" />
                        </a>
                        <a title="Instagram" href="https://www.instagram.com/DELTAUNIVERSITY/" target="_blank">
                            <img src="/assets/login/img/instagram.png" />
                        </a>
                        <a title="Youtube" href="https://www.youtube.com/channel/UCdfAEzXKJeTswIHskjFu55A" target="_blank">
                            <img src="/assets/login/img/youtube.png" />
                        </a>
                        <a title="Flicr" href="https://www.flickr.com/photos/deltaunivERSITY" target="_blank">
                            <img src="/assets/login/img/flickr.png" />
                        </a>
                        <a title="Twitter" href="#" target="_blank">
                            <img src="/assets/login/img/twitter.png" />
                        </a>
                        <a title="Whatsapp" href="https://wa.me/201281101599" target="_blank">
                            <img src="/assets/login/img/whats.png" />
                        </a>
                    </div>
                </div>

            </form>

        </section>
    </section>

</body>
</html>

<script>
    $(document).ready(function () {
        $("#txt_code").keyup(function (e) {
            $("#message").text('');
        });
        $('input[type=radio]').change(function () {
            if ($(this).val() == 3) {
                $(".forget").hide();
            }
            else {
                $(".forget").show();
            }
        })
        setTimeout(function () {
            var elem = document.getElementById("orange");
            var width = 26;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    width = 26;
                } else {
                    width = width + 0.08;
                    elem.style.width = width + "%";
                }
            }
        }, 1000);
    });
</script>
