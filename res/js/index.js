function getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
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


function toggleFlipCard(flip_card_name) {
    document.querySelector(".flip-card#" + flip_card_name).classList.toggle("flipped");
}


document.body.onload = function() {
    document.querySelectorAll(".popup-window-filter").forEach(function(e) {
        e.addEventListener("click", closePopup);
    });


    let profile_flip_card_interval = setInterval(function() {
        toggleFlipCard("profile-flip-card");
    }, 4000);

    let profile_flip_card = document.querySelector("#profile-flip-card");
    
    profile_flip_card.addEventListener("mouseover", function() {
        profile_flip_card_interval = clearInterval(profile_flip_card_interval);
    });
    
    profile_flip_card.addEventListener("click", function() {
        toggleFlipCard("profile-flip-card");
    });
};
