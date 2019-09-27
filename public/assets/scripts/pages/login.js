var app = new Vue({
    el: "#login",
    data: {
        company: null
    },
    methods: {
        refresh_company: function() {
            $.ajax({
                type: "post",
                url: "company/get",
                success: function(response) {
                    app.company = response.data;
                }
            });
        },
        handleLogin: function() {
            var form = $("[form-action=login]");
            var cocd = form.find("select[name=cocd]").val();
            var usercd = form.find("input[name=usercd]").val();
            var password = form.find("input[name=password]").val();
            hideFormAlert();

            $.ajax({
                type: "POST",
                url: "user/login",
                data: {
                    cocd: cocd,
                    usercd: usercd,
                    password: password
                },
                success: function(response) {
                    showAlert("success", response.message);
                    sessionStorage.setItem("token", response.data.token);
                    window.location = "index.php";
                },
                error: function(response) {
                    showAlert("error", response.responseJSON.message);
                    showFormAlert(form, response.responseJSON.data);
                }
            });
        }
    }
});

jQuery(document).ready(function() {
    if (sessionStorage.hasOwnProperty("token")) {
        window.location = "index.php";
    }
    app.refresh_company();
    $("select").focus();
});
