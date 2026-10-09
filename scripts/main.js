/* ========================================
CHURCH COMMUNITY WEBSITE
WDD 131 WEEK 06 PROJECT
======================================== */

/* 1. STORE CHURCH EVENTS IN AN ARRAY OF OBJECTS */

const churchEvents = [
{
id: 1,
title: "Sunday Worship Service",
category: "Worship",
description: "Join the congregation for worship, prayer, and spiritual learning.",
time: "Sunday"
},
{
id: 2,
title: "Youth Activities",
category: "Youth",
description: "Activities that encourage young people to learn, connect, and serve.",
time: "Check with the local congregation"
},
{
id: 3,
title: "Family Activities",
category: "Family",
description: "Opportunities for families to build relationships and participate together.",
time: "Check with the local congregation"
},
{
id: 4,
title: "Community Service",
category: "Service",
description: "Discover opportunities to help others and serve the community.",
time: "Check with the local congregation"
},
{
id: 5,
title: "Gospel Study",
category: "Learning",
description: "Explore opportunities to study the teachings of Jesus Christ.",
time: "Check with the local congregation"
}
];

/* 2. SELECT HTML ELEMENTS */

const currentYear = document.querySelector("#current-year");
const activityList = document.querySelector("#activity-list");
const upcomingActivities = document.querySelector("#upcoming-activities");
const showActivitiesButton = document.querySelector("#show-activities");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

/* 3. DISPLAY THE CURRENT YEAR */

function displayCurrentYear() {
if (currentYear) {
currentYear.textContent = new Date().getFullYear();
}
}

/* 4. CREATE HTML FOR A SINGLE EVENT */

function createEventCard(event) {
return "<article class="event-card"> <span class="event-category">${event.category}</span> <h2>${event.title}</h2> <p>${event.description}</p> <p><strong>When:</strong> ${event.time}</p> </article>";
}

/* 5. DISPLAY EVENTS IN THE SELECTED CONTAINER */

function displayEvents(events, container) {
if (!container) {
return;
}

if (events.length === 0) {
    container.innerHTML = `
        <p>No activities were found. Please try again.</p>
    `;
    return;
}

container.innerHTML = events.map(createEventCard).join("");

}

/* 6. DISPLAY A SMALL SELECTION ON THE HOME PAGE */

function displayUpcomingActivities() {
if (upcomingActivities) {
const featuredEvents = churchEvents.filter(
event => event.category === "Worship" ||
event.category === "Service"
);

    displayEvents(featuredEvents, upcomingActivities);
}

}

/* 7. DISPLAY ALL ACTIVITIES WHEN THE BUTTON IS CLICKED */

function handleShowActivities() {
displayEvents(churchEvents, activityList);
}

if (showActivitiesButton) {
showActivitiesButton.addEventListener(
"click",
handleShowActivities
);
}

/* 8. SAVE AND LOAD A VISITOR'S PREFERRED EVENT CATEGORY */

function savePreferredCategory(category) {
localStorage.setItem("preferredEventCategory", category);
}

function loadPreferredCategory() {
return localStorage.getItem("preferredEventCategory") || "All";
}

/* 9. FILTER EVENTS BY CATEGORY */

function filterEvents(category) {
let filteredEvents;

if (category === "All") {
    filteredEvents = churchEvents;
} else {
    filteredEvents = churchEvents.filter(
        event => event.category === category
    );
}

displayEvents(filteredEvents, activityList);
savePreferredCategory(category);

}

/* 10. CREATE A CATEGORY FILTER IF THE ELEMENT EXISTS */

const categoryFilter = document.querySelector("#category-filter");

if (categoryFilter) {
categoryFilter.value = loadPreferredCategory();

categoryFilter.addEventListener("change", function () {
    filterEvents(categoryFilter.value);
});

filterEvents(categoryFilter.value);

}

/* 11. HANDLE THE CONTACT FORM */

function handleContactForm(event) {
event.preventDefault();

if (!contactForm || !formFeedback) {
    return;
}

if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
}

const formData = new FormData(contactForm);

const visitor = {
    name: formData.get("fullname").trim(),
    email: formData.get("email").trim(),
    subject: formData.get("subject"),
    message: formData.get("message").trim()
};

if (
    !visitor.name ||
    !visitor.email ||
    !visitor.subject ||
    !visitor.message
) {
    formFeedback.textContent = `
        Please complete all fields before submitting.
    `;

    formFeedback.className = "error-message";
    return;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor.email)) {
    formFeedback.textContent = `
        Please enter a valid email address.
    `;

    formFeedback.className = "error-message";
    return;
}

formFeedback.textContent = `
    Thank you, ${visitor.name}! Your form has been checked successfully.
    This demonstration does not send your message to the church.
`;

formFeedback.className = "success-message";

contactForm.reset();

}

/* 12. LISTEN FOR FORM SUBMISSIONS */

if (contactForm) {
contactForm.addEventListener("submit", handleContactForm);
}

/* 13. INITIALIZE THE WEBSITE */

function initializeWebsite() {
displayCurrentYear();
displayUpcomingActivities();
}

initializeWebsite();