function getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


let tooltip_delays = {};


function tooltipEnter(event) {
    const element = this;
    const tooltip_id = element.getAttribute("tooltip-id");
    const tooltip_delay = element.getAttribute("tooltip-delay") || .3;
    let tooltip = document.querySelector("#tooltip-" + tooltip_id);
    tooltip_delays[tooltip_id] = setTimeout(function() {
        const pos = getPosition(element);
        const x = parseInt(pos.left + (element.clientWidth / 2) - (tooltip.clientWidth / 2));
        const y = parseInt(pos.top + element.clientHeight + 20);
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
        tooltip.classList.add("visible");
    }, tooltip_delay * 1000);
    console.log(tooltip_delays);
}


function tooltipLeave(event) {
    const element = this;
    const tooltip_id = element.getAttribute("tooltip-id");
    tooltip_delays[tooltip_id] = clearTimeout(tooltip_delays[tooltip_id]);
    let tooltip = document.querySelector("#tooltip-" + tooltip_id);
    tooltip.classList.remove("visible");
}


function redirect(url, auto_scroll = true) {
    const separator = (url.includes("?")) ? "&" : "?";
    window.location.href = url +
        ((auto_scroll) ? (separator + "y=" + encodeURIComponent(window.scrollY)) : "");
}


function openPopup(popup_name) {
    redirect("?popup=" + encodeURIComponent(popup_name));
}


function closePopup() {
    redirect("/");
}


document.body.onload = function() {
    let tooltip_index = 0;

    const element_list = document.querySelectorAll("[tooltip]");
    element_list.forEach(function(element) {
        let tooltip = document.createElement("span");
        tooltip.classList.add("tooltip");
        tooltip.id = "tooltip-" + tooltip_index;
        tooltip.innerText = element.getAttribute("tooltip");
        document.body.appendChild(tooltip);
        element.setAttribute("tooltip-id", tooltip_index);
        element.setAttribute("tooltip", "");
        element.addEventListener("mouseenter", tooltipEnter);
        element.addEventListener("mouseleave", tooltipLeave);
        tooltip_index ++;
    });

    document.querySelectorAll(".popup-window-filter").forEach(function(e) {
        e.addEventListener("click", closePopup);
    });

    setInterval(function() {
        document.querySelector("#profile-flip-card").classList.toggle("flipped");
    }, 4000);
};
