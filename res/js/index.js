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
    // redirect("?popup=" + encodeURIComponent(popup_name));
    document.querySelector(".popup-window-filter[data-popup='" + popup_name + "']")
        .classList.add("active");
    document.querySelector(".popup#" + popup_name)
        .classList.add("active");
}


function closePopup() {
    // redirect("/");
    document.querySelectorAll(".popup-window-filter, .popup").forEach(function(e) {
        e.classList.remove("active");
    });
    // document.querySelectorAll(".popup").forEach(function(e) {
        // e.classList.remove("active");
    // });
}


function toggleFlipCard(flip_card_name) {
    document.querySelector(".flip-card#" + flip_card_name).classList.toggle("flipped");
}


function expandCard(card) {
    card.classList.add("expanded");
}


function collapseCard(card) {
    card.classList.remove("expanded");
}


function toggleExpandableCard(card) {
    console.log(card);
    if (card.classList.contains("expanded")) {
        collapseCard(card);
    } else {
        expandCard(card);
    }
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

    document.querySelectorAll(".expandable-card").forEach(function(e) {
        e.querySelector(".expand-cta").addEventListener("click", function() {
            toggleExpandableCard(e);
        });
    });
};
