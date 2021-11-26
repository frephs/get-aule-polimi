
let buildingRegex = /^./;
let leoRegex = /^[0-9]+/;
let bovRegex = /^(BL\.)?[^. ]+((?=\.)|(?= ))/
let positions = {};
let positionsLeo = {
    "1": [282 / 1012, 476 / 1012],
    "2": [263 / 1012, 371 / 1012],
    "3": [263 / 1012, 557 / 1012],
    "4": [339 / 1012, 377 / 1012],
    "5": [339 / 1012, 572 / 1012],
    "6": [375 / 1012, 478 / 1012],
    "7": [423 / 1012, 483 / 1012],
    "8": [419 / 1012, 398 / 1012],
    "9": [413 / 1012, 576 / 1012],
    "10": [447 / 1012, 351 / 1012],
    "11": [227 / 1012, 263 / 1012],
    "12": [275 / 1012, 306 / 1012],
    "13": [319 / 1012, 257 / 1012],
    "14": [384 / 1012, 264 / 1012],
    "15": [425 / 1012, 311 / 1012],
    "19": [558 / 1012, 400 / 1012],
    "20": [662 / 1012, 412 / 1012],
    "21": [776 / 1012, 368 / 1012],
    "22": [844 / 1012, 498 / 1012],
    "23": [867 / 1012, 522 / 1012],
    "24": [844 / 1012, 556 / 1012],
    "25": [882 / 1012, 552 / 1012],
    "26": [854 / 1012, 631 / 1012],
    "29": [175 / 1012, 638 / 1012],
};
let positionsBov = {
    "B1": [946 / 1074, (236 + 20) / 1074],
    "B2": [927 / 1074, (181 + 20) / 1074],
    "B3": [910 / 1074, (127 + 20) / 1074],
    "B4": [800 / 1074, (223 + 20) / 1074],
    "B5": [806 / 1074, (397 + 20) / 1074],
    "B6": [875 / 1074, (305 + 20) / 1074],
    "B7": [686 / 1074, (267 + 20) / 1074],
    "B8": [738 / 1074, (307 + 20) / 1074],
    "B9": [724 / 1074, (236 + 20) / 1074],
    "B10": [68 / 10749, (69 + 20) / 1074],
    "B11": [197 / 1074, (649 + 20) / 1074],
    "B12": [132 / 1074, (646 + 20) / 1074],
    "B13": [168 / 1074, (611 + 20) / 1074],
    "B14": [251 / 1074, (577 + 20) / 1074],
    "B15": [305 / 1074, (548 + 20) / 1074],
    "B16": [354 / 1074, (522 + 20) / 1074],
    "B18": [300 / 1074, (489 + 20) / 1074],
    "B19": [191 / 1074, (504 + 20) / 1074],
    "B20": [132 / 1074, (501 + 20) / 1074],
    "B21": [271 / 1074, (615 + 20) / 1074],
    "B22": [366 / 1074, (561 + 20) / 1074],
    "B23": [414 / 1074, (612 + 20) / 1074],
    "B24": [37 / 1074, (603 + 20) / 1074],
    "BL.25": [225 / 1074, (403 + 20) / 1074],
    "BL.25.A": [183 / 1074, (444 + 20) / 1074],
    "BL.26": [217 / 1074, (371 + 20) / 1074],
    "BL.27": [273 / 1074, (334 + 20) / 1074],
    "BL.28": [273 / 1074, (395 + 20) / 1074],
    "B29": [32 / 1074, (639 + 20) / 1074],
}

let mapOpen = true;
let onlyMap = false;
let lastPosition = null;

function adjustCircle() {
    let circle = $(".circle");
    if (lastPosition != null) {
        let mapWidth = $("#map-1").width();
        circle.css("left", mapWidth * lastPosition[0] - 30 + "px");
        circle.css("top", mapWidth * lastPosition[1] - 30 + "px");
    }
}

window.onresize = () => {
    mapOpen = $("#map").is(":visible");
    $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
}
window.onload = () => {
    mapOpen = $("#map").is(":visible");
    $("#title-back").click(() => {
        window.location.pathname = "/aule"
    })
    $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
    $(".circle").hide().css("opacity", "0");
    $("#open").click(() => {
        if (!onlyMap) {
            mapOpen = !mapOpen;
            if (mapOpen) {
                $("#map").show();
            } else {
                $("#map").hide();
            }
        } else {
            $("#table-container").show();
            if (mapOpen) {
                $("#map").show();
            } else {
                $("#map").hide();
            }
            onlyMap = false;
        }
        $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
        adjustCircle();
    })
    $("#search").on("input", () => {
        let value = $("#search").val().toUpperCase().replace(/[^A-Z0-9]/, "");
        $("#table").find("tbody>tr").each((pos, el) => {
            let text = $(el).find("td:nth-child(1)").text().toUpperCase().replace(/[^A-Z0-9]/, "");
            if (text.includes(value)) {
                $(el).show()
            } else {
                $(el).hide()
            }
        })
    })
    $("tr").mouseenter((ev) => {
        let numbers = buildingRegex.exec($($(ev.target).parent().children()[0]).text());
        let circle = $(".circle");
        if (numbers != null) {
            let number = numbers[0];
            let position = positions[number];
            if (position != null) {
                lastPosition = position;
                adjustCircle();
                circle.show();
                circle.css("opacity", "1");
            } else {
                lastPosition = null;
                circle.hide();
                circle.css("opacity", "0");
            }
        } else {
            circle.hide();
            circle.css("opacity", "0");
        }
    })
    $("tr").click((ev) => {
        $("#table-container").hide();
        $("#map").show();
        onlyMap = true;
        adjustCircle();
        $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
        
    })
    
    switch (map) {
        case 1: {
            $("#bov-map").hide();
            $("#leo-map").show();
            $("#no-map").hide();
            positions = positionsLeo;
            buildingRegex = leoRegex;
            break;
        }
        case 2: {
            $("#bov-map").show();
            $("#leo-map").hide();
            $("#no-map").hide();
            positions = positionsBov;
            buildingRegex = bovRegex;
            break;
        }
        default: {
            $("#bov-map").hide();
            $("#leo-map").hide();
            $("#no-map").show();
            if (mapOpen) {
                $("#open").click();
            }
            break;
        }
    }
}