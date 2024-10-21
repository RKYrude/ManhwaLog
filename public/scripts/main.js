const Search = document.querySelector("#searchBar");

Search.addEventListener('input', () => {
    if(Search.value[0] === "/") {
        Search.type = "password";
    } else {
        Search.type = "text"; // Revert to text if input changes
    }
});


const selectElements = Array.from(document.getElementsByClassName('status-select'));

selectElements.forEach((selectElement) => {
    function updateSelectColor() {
        const selectedValue = selectElement.value;

        if (selectedValue === 'ONGOING') {
            selectElement.style.color = 'rgb(0, 255, 0)';
        } else if (selectedValue === 'COMPLETED') {
            selectElement.style.color = 'rgb(131, 130, 130)';
        } else if (selectedValue === 'HAITUS') {
            selectElement.style.color = 'red';
        }
    }

    updateSelectColor();

    selectElement.addEventListener('change', updateSelectColor);
});




try {
    const imageUrlInput = document.getElementById('addnewURL');
    const previewImage = document.getElementById('addnewCover');

    imageUrlInput.addEventListener('input', function() {
        const imageUrl = this.value;
        previewImage.src = imageUrl;

        previewImage.onerror = function() {
            previewImage.src = "/assets/noImageFound.png";
        };
    });

} catch (error) {
    console.error("no addnewURL found");
}
        

const editimageUrlInputs = document.querySelectorAll('.editnewURL');
const editpreviewImages = document.querySelectorAll('.editnewCover');

// Loop over each input field
editimageUrlInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        const imageUrl = this.value;
        const previewImage = editpreviewImages[index];  // Get the corresponding preview image
        
        previewImage.src = imageUrl;

        // Set the fallback image if the image URL is invalid
        previewImage.onerror = function() {
            previewImage.src = "/assets/noImageFound.png";
        };
    });
});

const statusColor = document.querySelectorAll(".status");

statusColor.forEach((input) => {
    if (input.innerText === "ONGOING") {
        input.style.color = "rgb(0, 255, 0)"; // Change the text color to green
    }
    else if (input.innerText === "COMPLETED") {
        input.style.color = "rgb(73, 73, 73)"; // Change the text color to grey
    }
    else{
        input.style.color = "red"; // Change the text color to red
    }
});


// Query all matching elements
const filterBtn = document.querySelectorAll(".filter");
const filterOptions = document.querySelectorAll(".filter-options");

const add = document.querySelectorAll(".add");
const addNew = document.querySelectorAll(".addNewPage");

const cpyBtn = document.querySelectorAll(".main-title");
const cpyMsg = document.querySelector(".cpy-msg");

const COMPconfirm = document.querySelectorAll(".COMP-confirm");
const COMPLETEbtn = document.querySelectorAll(".COMPLETE");
const COMPcancel = document.querySelectorAll("#COMPcancel");

const DELconfirm = document.querySelectorAll(".DEL-confirm");
const DELETEbtn = document.querySelectorAll(".DELETE");
const DELcancel = document.querySelectorAll("#DELcancel");

const EDITconfirm = document.querySelectorAll(".EDIT-confirm");
const EDITbtn = document.querySelectorAll(".EDIT")
const EDITcancel = document.querySelectorAll("#EDITcancel")

// Loop through NodeLists to attach event listeners to each element

filterBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        filterOptions[index].classList.toggle("active");

        add.forEach(el => el.classList.remove("active"));
        addNew.forEach(el => el.classList.remove("active"));
        COMPconfirm.forEach(el => el.classList.remove("active"));
        DELconfirm.forEach(el => el.classList.remove("active"));
        EDITconfirm.forEach(el => el.classList.remove("active"));
    });
});

add.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        addNew[index].classList.toggle("active");

        filterBtn.forEach(el => el.classList.remove("active"));
        filterOptions.forEach(el => el.classList.remove("active"));
        COMPconfirm.forEach(el => el.classList.remove("active"));
        DELconfirm.forEach(el => el.classList.remove("active"));
        EDITconfirm.forEach(el => el.classList.remove("active"));
    });
});

COMPLETEbtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        // First, remove the 'active' class from all COMPconfirm elements
        COMPconfirm.forEach((panel) => {
            panel.classList.remove("active");
        });

        COMPconfirm[index].classList.add("active");

        add.forEach(el => el.classList.remove("active"));
        addNew.forEach(el => el.classList.remove("active"));
        filterBtn.forEach(el => el.classList.remove("active"));
        filterOptions.forEach(el => el.classList.remove("active"));
        DELconfirm.forEach(el => el.classList.remove("active"));
        EDITconfirm.forEach(el => el.classList.remove("active"));
    });
});

COMPcancel.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        COMPconfirm[index].classList.remove("active");
    });
});

DELETEbtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        DELconfirm.forEach((panel) => {
            panel.classList.remove("active");
        });

        DELconfirm[index].classList.add("active");

        add.forEach(el => el.classList.remove("active"));
        addNew.forEach(el => el.classList.remove("active"));
        filterBtn.forEach(el => el.classList.remove("active"));
        filterOptions.forEach(el => el.classList.remove("active"));
        COMPconfirm.forEach(el => el.classList.remove("active"));
        EDITconfirm.forEach(el => el.classList.remove("active"));
    });
});
DELcancel.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        DELconfirm[index].classList.remove("active");
    });
});

EDITbtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        EDITconfirm.forEach((panel) => {
            panel.classList.remove("active");
        });

        EDITconfirm[index].classList.add("active");

        add.forEach(el => el.classList.remove("active"));
        addNew.forEach(el => el.classList.remove("active"));
        filterBtn.forEach(el => el.classList.remove("active"));
        filterOptions.forEach(el => el.classList.remove("active"));
        COMPconfirm.forEach(el => el.classList.remove("active"));
        DELconfirm.forEach(el => el.classList.remove("active"));
    });
});
EDITcancel.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        EDITconfirm[index].classList.remove("active");
    });
});

// Copy Button Logic
cpyBtn.forEach((btn, index) => {
    // Unified function to handle both events
    function handleCopy() {
        const content = document.getElementsByClassName("main-title")[index].textContent.trim();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(content)
                .then(() => {
                    cpyMsg.classList.add("active");
                    setTimeout(function() {
                        cpyMsg.classList.remove("active");
                    }, 700);
                })
                .catch(err => {
                    console.error("Error copying to clipboard: ", err);
                });
        } else {
            console.error("Clipboard API not supported.");
        }
    }

    // Attach both click and touchend events to the unified function
    btn.addEventListener("click", handleCopy);
    btn.addEventListener("dblclick", handleCopy);
});


//search bar vanishh baheviour
const topBar = document.getElementsByTagName("nav")[0];
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        topBar.style.top = '-60px'; 
    } else {
        topBar.style.top = '7px';
    }
    lastScrollY = window.scrollY;
});


///scroll to bottom
const scrollToBottomBtn = document.getElementById("scrollToBottom");

scrollToBottomBtn.addEventListener("click", () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});