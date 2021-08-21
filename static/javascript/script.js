const menuBtn = document.querySelector('#menu-bar');
const navbarElt = document.querySelector('.header .navbar');
menuBtn.addEventListener('click', () => {
    navbarElt.classList.toggle('active');
})

function validation() {

    var airlineElt = document.getElementById('airline');
    airlineElt.parentElement.classList.add('success');


    var dateOfJourneyElt = document.getElementById('date_of_journey');
    if (dateOfJourneyElt.value.indexOf('/') > -1) {
        if (moment(`${dateOfJourneyElt.value.split("/")[0]}/${dateOfJourneyElt.value.split("/")[1]}/${dateOfJourneyElt.value.split("/")[2]}`, 'DD/MM/YYYY', true).isValid()) {
            setSuccessMsg(dateOfJourneyElt);
        } else {
            return setErrorMsg(dateOfJourneyElt, "** not a valid date");
        }
    } else {
        return setErrorMsg(dateOfJourneyElt, "** date should be separated by slash");
    }

    var airportCodes = ['IXD', 'IXV', 'IXU', 'IXB', 'RGH', 'BEK', 'IXG', 'BEP', 'BLR', 'BUP', 'BHU', 'BHO', 'BBI', 'BHJ', 'KUU', 'BKB', 'PAB', 'CBD', 'IXC', 'MAA', 'COK', 'CJB', 'COH', 'CDP', 'NMB', 'DAE', 'IXB', 'DED', 'DEL', 'DEP', 'DBD', 'DHM', 'DIB', 'DMU', 'DIU', 'GAY', 'GOI', 'GOP', 'GUX', 'GAU', 'GWL', 'HSS', 'HBX', 'BPM', 'HYD', 'IMF', 'IDR', 'JLR', 'JGB', 'JAI', 'JSA', 'IXJ', 'JGA', 'IXW', 'PYB', 'JDH', 'JRH', 'IXH', 'SAG', 'IXQ', 'IXY', 'CNN', 'KNU', 'IXK', 'HJR', 'IXN', 'KLH', 'CCU', 'KTU', 'CCJ', 'IXL', 'IXI', 'LKO', 'LUH', 'IXM', 'LDA', 'IXE', 'BOM', 'VAJ', 'MZA', 'MZU', 'MYQ', 'NAG', 'NDC', 'ISK', 'Nav', 'NVY', 'OMN', 'PGH', 'IXT', 'IXP', 'PAT', 'PNY', 'PBD', 'IXZ', 'PNQ', 'PUT', 'RPR', 'RJA', 'RAJ', 'RMD', 'IXR', 'RTC', 'REW', 'RRK', 'RUP', 'SXV', 'TNI', 'SHL', 'SSE', 'IXS', 'SLV', 'SXR', 'STV', 'TEZ', 'TEI', 'TRV', 'TRZ', 'TIR', 'TCR', 'UDR', 'BDQ', 'VNS', 'VGA', 'VTZ', 'WGC', 'ZER'];

    var sourceElt = document.getElementById('source');
    if (sourceElt.value.trim()) {
        if (airportCodes.includes(sourceElt.value.trim())) {
            setSuccessMsg(sourceElt);
        } else {
            return setErrorMsg(sourceElt, "** entered source airport code is invalid");
        }
    } else {
        return setErrorMsg(sourceElt, "** source airport code cannot be empty");
    }


    var destinationElt = document.getElementById('destination');
    if (destinationElt.value.trim()) {
        if (airportCodes.includes(destinationElt.value.trim())) {
            if (destinationElt.value != sourceElt.value) {
                setSuccessMsg(destinationElt);
            } else {
                return setErrorMsg(destinationElt, "** source and destination airport must be different.");
            }
        } else {
            return setErrorMsg(destinationElt, "** entered destination airport code is invalid")
        }

    } else {
        return setErrorMsg(destinationElt, "** destination airport code cannot be empty");
    }


    var stopsElt = document.getElementById('stops');
    stopsElt.parentElement.classList.add('success');

    var routeElt = document.getElementById('route');
    if (routeElt.value.indexOf('->') > -1) {
        var routeEltArray = routeElt.value.split("->");
        for (var k = 0; k < routeEltArray.length; k++) {
            if (!airportCodes.includes(routeEltArray[k])) {
                return setErrorMsg(routeElt, "** airport code is invalid");
            }
        }
        if (sourceElt.value != routeEltArray[0]) {
            return setErrorMsg(routeElt, "** route start doesn't matches with source");
        } else if (destinationElt.value != routeEltArray[(routeEltArray.length) - 1]) {
            return setErrorMsg(routeElt, "** route end doesn't matches destination");
        } else if ((stopsElt.value == "non-stop" && ((routeEltArray.length) - 2) != 0) || (stopsElt.value == "1 stop" && ((routeEltArray.length) - 2) != 1) || (stopsElt.value == "2 stops" && ((routeEltArray.length) - 2) != 2) || (stopsElt.value == "3 stops" && ((routeEltArray.length) - 2) != 3) || (stopsElt.value == "4 stops" && ((routeEltArray.length) - 2) != 4)) {
            return setErrorMsg(routeElt, "** route doesn't matches with no of stops");
        } else {
            setSuccessMsg(sourceElt);
            setSuccessMsg(destinationElt);
            setSuccessMsg(routeElt);
        }
    } else {
        return setErrorMsg(routeElt, "** route should be separated by arrow");
    }

    var deptTimeElt = document.getElementById('dept_time');
    if (deptTimeElt.value.indexOf(':') > -1) {
        var deptHour = parseInt(deptTimeElt.value.split(':')[0]);
        var deptMinute = parseInt(deptTimeElt.value.split(':')[1]);
        if (deptTimeElt.value.split(':').length != 2) {
            return setErrorMsg(deptTimeElt, "** departure time is of invalid format");
        } else if (deptHour < 0 || deptHour > 23) {
            return setErrorMsg(deptTimeElt, "** departure time hour is invalid");
        } else if (deptMinute < 0 || deptMinute > 59) {
            return setErrorMsg(deptTimeElt, "** departure time minute invalid");
        } else {
            setSuccessMsg(deptTimeElt);
        }
    } else {
        return setErrorMsg(deptTimeElt, "** departure time should be separated by colon")
    }

    var arvTimeElt = document.getElementById('arv_time');
    if (arvTimeElt.value.indexOf(":") > -1) {
        var arvHour = parseInt(arvTimeElt.value.split(':')[0]);
        var arvMinute = parseInt(arvTimeElt.value.split(':')[1]);
        if (arvTimeElt.value.split(':').length != 2) {
            return setErrorMsg(arvTimeElt, "** arrival time is of invalid format");
        } else if (arvHour < 0 || arvHour > 23) {
            return setErrorMsg(arvTimeElt, "** arrival time hour is invalid");
        } else if (arvMinute < 0 || arvMinute > 59) {
            return setErrorMsg(arvTimeElt, "** arrival time minute is invalid");
        } else {
            setSuccessMsg(arvTimeElt);
        }
    } else {
        return setErrorMsg(arvTimeElt, "** arrival time should be separated by colon");
    }
    return true;
}
function setErrorMsg(input, msg) {
    var formGroup = input.parentElement;
    formGroup.querySelector('span').style.display = "initial";
    formGroup.querySelector('span').innerHTML = msg;
    formGroup.className = 'form-group error';
    return false;
}
function setSuccessMsg(input) {
    var formGroup = input.parentElement;
    formGroup.querySelector('span').innerHTML = "";
    formGroup.className = 'form-group success';
}