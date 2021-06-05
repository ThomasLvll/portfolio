function getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
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
        const pos = getPosition(element);
        const x = parseInt(pos.left + (element.clientWidth / 2) - (tooltip.clientWidth / 2));
        const y = parseInt(pos.top + element.clientHeight + 10);
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
        element.setAttribute("tooltip-id", tooltip_index);
        element.setAttribute("tooltip", "");
        element.addEventListener("mouseenter", function() {
            document.querySelector("#tooltip-" + this.getAttribute("tooltip-id")).classList.add("visible");
        });
        element.addEventListener("mouseleave", function() {
            document.querySelector("#tooltip-" + this.getAttribute("tooltip-id")).classList.remove("visible");
        });
        tooltip_index ++;
    });
};
