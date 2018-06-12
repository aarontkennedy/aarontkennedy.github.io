$(document).foundation();

$(document).ready(function () {
    let allPortfolioItems = $(".portfolioItems li");

    $("#technologies").on("click", "li", function (e) {
        e.preventDefault();
        let techClass = $(this).text().toLowerCase().replace(/\W/g, '');

        switch (techClass) {
            case "showall":
                allPortfolioItems.show();
                break;
            default:
                allPortfolioItems.hide();
                $("."+techClass).show();
        }

    });


});