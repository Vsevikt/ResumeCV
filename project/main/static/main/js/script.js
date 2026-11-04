/* --------------------------------
       ELEMENTS
    -------------------------------- */

    const fields = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        workDirection: document.getElementById("workDirection"),

        city: document.getElementById("city"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),

        about: document.getElementById("about"),
        qualities: document.getElementById("qualities"),
        careerGoal: document.getElementById("careerGoal"),

        institution: document.getElementById("institution"),
        specialty: document.getElementById("specialty"),
        studyStart: document.getElementById("studyStart"),
        studyEnd: document.getElementById("studyEnd"),

        programming: document.getElementById("programming"),
        programs: document.getElementById("programs"),
        languages: document.getElementById("languages"),

        projectName: document.getElementById("projectName"),
        projectDescription: document.getElementById("projectDescription"),
        technologies: document.getElementById("technologies"),
        results: document.getElementById("results")
    };


    /* --------------------------------
       PREVIEW ELEMENTS
    -------------------------------- */

    const preview = {
        name: document.getElementById("previewName"),
        workDirection: document.getElementById("previewWorkDirection"),

        city: document.getElementById("previewCity"),
        email: document.getElementById("previewEmail"),
        phone: document.getElementById("previewPhone"),

        about: document.getElementById("previewAbout"),
        qualities: document.getElementById("previewQualities"),
        careerGoal: document.getElementById("previewCareerGoal"),

        institution: document.getElementById("previewInstitution"),
        specialty: document.getElementById("previewSpecialty"),
        studyPeriod: document.getElementById("previewStudyPeriod"),

        programming: document.getElementById("previewProgramming"),
        programs: document.getElementById("previewPrograms"),
        languages: document.getElementById("previewLanguages"),

        projectName: document.getElementById("previewProjectName"),
        projectDescription: document.getElementById("previewProjectDescription"),
        technologies: document.getElementById("previewTechnologies"),
        results: document.getElementById("previewResults")
    };


    /* --------------------------------
       HELPER
    -------------------------------- */

    function getValue(field) {
        return field.value.trim();
    }

    function setText(element, value, fallback) {
        element.textContent = value || fallback;
    }


    /* --------------------------------
       UPDATE PREVIEW
    -------------------------------- */

    function updatePreview() {

        const firstName = getValue(fields.firstName);
        const lastName = getValue(fields.lastName);

        const fullName = `${firstName} ${lastName}`.trim();

        setText(
            preview.name,
            fullName,
            "Your First and Last Name"
        );

        setText(
            preview.workDirection,
            getValue(fields.workDirection),
            "Desired Position"
        );

        setText(
            preview.city,
            getValue(fields.city)
                ? "📍 " + getValue(fields.city)
                : "📍 City"
        );

        setText(
            preview.email,
            getValue(fields.email)
                ? "✉ " + getValue(fields.email)
                : "✉ Email"
        );

        setText(
            preview.phone,
            getValue(fields.phone)
                ? "☎ " + getValue(fields.phone)
                : "☎ Phone"
        );

        setText(
            preview.about,
            getValue(fields.about),
            "A brief introduction about you, your interests, experience, and professional qualities."
        );

        setText(
            preview.qualities,
            getValue(fields.qualities),
            "Your personal qualities."
        );

        setText(
            preview.careerGoal,
            getValue(fields.careerGoal),
            "Your professional goals."
        );

        setText(
            preview.institution,
            getValue(fields.institution),
            "Educational Institution"
        );

        setText(
            preview.specialty,
            getValue(fields.specialty),
            "Field of Study"
        );

        const studyStart = getValue(fields.studyStart);
        const studyEnd = getValue(fields.studyEnd);

        let studyPeriod = "Study Period";

        if (studyStart || studyEnd) {
            studyPeriod = `${studyStart || "—"} – ${studyEnd || "Present"}`;
        }

        preview.studyPeriod.textContent = studyPeriod;

        setText(
            preview.programming,
            getValue(fields.programming),
            "—"
        );

        setText(
            preview.programs,
            getValue(fields.programs),
            "—"
        );

        setText(
            preview.languages,
            getValue(fields.languages),
            "—"
        );

        setText(
            preview.projectName,
            getValue(fields.projectName),
            "Project Name or Position"
        );

        setText(
            preview.projectDescription,
            getValue(fields.projectDescription),
            "Project or work experience description."
        );

        setText(
            preview.technologies,
            getValue(fields.technologies),
            "Technologies used"
        );

        setText(
            preview.results,
            getValue(fields.results),
            "Achievements"
        );

        renderAdditionalEducation();
    }


    /* --------------------------------
       ADDITIONAL EDUCATION
    -------------------------------- */

    function addEducation() {

        const container = document.getElementById("additionalEducation");

        const item = document.createElement("div");

        item.className = "additional-education-item";

        item.style.cssText = `
            padding: 18px;
            margin-top: 16px;
            margin-bottom: 0px;
            background: #faf9ff;
            border: 1px solid #e9e7f1;
            border-radius: 13px;
            box-sizing: border-box;
            max-width: 100%;
        `;

        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">

                <strong style="color: #7555d9; font-size: 13px;">
                    <i class="bi bi-mortarboard me-2"></i>
                    Additional Education
                </strong>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger remove-education"
                    title="Remove education"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>

            <div class="form-group">
                <label class="form-label">Educational Institution</label>

                <input
                    type="text"
                    class="form-control extra-institution"
                    placeholder="University or college name"
                >
            </div>

            <div class="form-group">
                <label class="form-label">Field of Study</label>

                <input
                    type="text"
                    class="form-control extra-specialty"
                    placeholder="For example, Computer Science"
                >
            </div>

            <div class="row">

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>

                        <input
                            type="text"
                            class="form-control extra-study-start"
                            placeholder="2022"
                        >
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">End Date</label>

                        <input
                            type="text"
                            class="form-control extra-study-end"
                            placeholder="2026"
                        >
                    </div>
                </div>

            </div>
        `;

        container.appendChild(item);

        item.querySelectorAll("input").forEach(function(input) {

            input.addEventListener("input", updatePreview);

            input.addEventListener("change", updatePreview);

        });

        item.querySelector(".remove-education").addEventListener("click", function() {

            item.remove();

            updatePreview();

        });

        updatePreview();
    }


    /* --------------------------------
       RENDER ADDITIONAL EDUCATION
    -------------------------------- */

    function renderAdditionalEducation() {

        const container = document.getElementById("additionalEducation");

        const previewContainer = document.getElementById("previewAdditionalEducation");

        if (!container || !previewContainer) {
            return;
        }

        previewContainer.innerHTML = "";

        const educationItems = container.querySelectorAll(".additional-education-item");

        educationItems.forEach(function(item) {

            const institution = item.querySelector(".extra-institution").value.trim();

            const specialty = item.querySelector(".extra-specialty").value.trim();

            const start = item.querySelector(".extra-study-start").value.trim();

            const end = item.querySelector(".extra-study-end").value.trim();

            if (!institution && !specialty && !start && !end) {
                return;
            }

            const entry = document.createElement("div");

            entry.className = "resume-entry";

            const title = document.createElement("strong");

            title.textContent = institution || "Educational Institution";

            const period = document.createElement("small");

            if (start || end) {
                period.textContent = `${start || "—"} – ${end || "Present"}`;
            }

            const description = document.createElement("p");

            description.textContent = specialty;

            entry.appendChild(title);

            if (start || end) {
                entry.appendChild(period);
            }

            if (specialty) {
                entry.appendChild(description);
            }

            previewContainer.appendChild(entry);

        });
    }


    /* --------------------------------
       LIVE PREVIEW LISTENERS
    -------------------------------- */

    Object.values(fields).forEach(function(field) {

        field.addEventListener("input", updatePreview);

        field.addEventListener("change", updatePreview);

    });


    /* --------------------------------
       PHOTO BY URL
    -------------------------------- */

    const photoInput = document.getElementById("photo");

    const previewPhoto = document.getElementById("previewPhoto");

    const photoPlaceholder = document.getElementById("photo-placeholder");

    function updatePhotoFromUrl() {

        const url = photoInput.value.trim();

        if (!url) {

            previewPhoto.removeAttribute("src");

            previewPhoto.style.display = "none";

            photoPlaceholder.style.display = "flex";

            return;
        }

        previewPhoto.onload = function() {

            previewPhoto.style.display = "block";

            photoPlaceholder.style.display = "none";

        };

        previewPhoto.onerror = function() {

            previewPhoto.style.display = "none";

            photoPlaceholder.style.display = "flex";

        };

        previewPhoto.src = url;
    }

    photoInput.addEventListener("input", updatePhotoFromUrl);


    /* --------------------------------
       PHOTO FROM DEVICE
    -------------------------------- */

    const photoFile = document.getElementById("photoFile");

    const photoFileName = document.getElementById("photoFileName");

    photoFile.addEventListener("change", function(event) {

        const file = event.target.files[0];

        if (!file) {

            photoFileName.textContent = "No file selected";

            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {

            alert("Please choose a photo in JPG, PNG, or WEBP format.");

            photoFile.value = "";

            photoFileName.textContent = "No file selected";

            return;
        }

        const maxSize = 8 * 1024 * 1024;

        if (file.size > maxSize) {

            alert("The photo size must not exceed 8 MB.");

            photoFile.value = "";

            photoFileName.textContent = "No file selected";

            return;
        }

        photoFileName.textContent = file.name;

        const reader = new FileReader();

        reader.onload = function(e) {

            previewPhoto.onload = function() {

                previewPhoto.style.display = "block";

                photoPlaceholder.style.display = "none";

            };

            previewPhoto.src = e.target.result;

        };

        reader.onerror = function() {

            alert("Unable to read the file.");

        };

        reader.readAsDataURL(file);

    });


    /* --------------------------------
       WAIT FOR IMAGES
    -------------------------------- */

    async function waitForImages(container) {

        const images = Array.from(container.querySelectorAll("img"));

        await Promise.all(

            images.map(function(img) {

                if (!img.src) {
                    return Promise.resolve();
                }

                if (img.complete) {
                    return Promise.resolve();
                }

                return new Promise(function(resolve) {

                    img.onload = resolve;

                    img.onerror = resolve;

                    setTimeout(resolve, 10000);

                });

            })

        );
    }


    /* --------------------------------
       DOWNLOAD PDF
    -------------------------------- */

    async function downloadPDF() {

        const resume = document.getElementById("resume-paper");

        const button = document.getElementById("downloadPDFButton");

        if (!resume) {

            alert("Unable to find the resume.");

            return;
        }

        if (typeof html2pdf === "undefined") {

            alert(
                "The PDF library failed to load. Check your internet connection and refresh the page."
            );

            return;
        }

        const originalButtonText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Creating PDF...
        `;

        let clone = null;

        try {

            updatePreview();

            clone = resume.cloneNode(true);

            clone.id = "resume-pdf-clone";

            clone.classList.add("pdf-export");

            clone.style.position = "absolute";

            clone.style.left = "0";

            clone.style.top = "0";

            clone.style.zIndex = "-1";

            clone.style.visibility = "visible";

            clone.style.opacity = "1";

            clone.style.width = "794px";

            clone.style.maxWidth = "none";

            clone.style.height = "auto";

            clone.style.minHeight = "0";

            clone.style.margin = "0";

            clone.style.overflow = "visible";

            clone.style.background = "#ffffff";

            document.body.appendChild(clone);

            if (document.fonts && document.fonts.ready) {

                await document.fonts.ready;

            }

            await waitForImages(clone);

            await new Promise(function(resolve) {

                requestAnimationFrame(function() {

                    requestAnimationFrame(resolve);

                });

            });

            const firstName = getValue(fields.firstName) || "resume";

            const lastName = getValue(fields.lastName);

            const fileName = `${firstName}_${lastName}`
                .replace(/[\\/:*?"<>|]/g, "")
                .replace(/\s+/g, "_")
                .replace(/^_+|_+$/g, "");

            const options = {

                margin: [10, 10, 10, 10],

                filename: `${fileName || "resume"}.pdf`,

                image: {
                    type: "jpeg",
                    quality: 0.98
                },

                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: "#ffffff",
                    logging: false,
                    imageTimeout: 15000,
                    scrollX: 0,
                    scrollY: 0
                },

                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait",
                    compress: true
                },

                pagebreak: {
                    mode: ["css", "legacy"],
                    avoid: [
                        ".resume-header",
                        ".resume-entry",
                        ".resume-section h3"
                    ]
                }

            };

            await html2pdf()
                .set(options)
                .from(clone)
                .save();

        } catch (error) {

            console.error("PDF generation error:", error);

            alert(
                "Unable to create the PDF. Please try again. If you are using an external photo, check whether the image is accessible."
            );

        } finally {

            if (clone && clone.parentNode) {

                clone.parentNode.removeChild(clone);

            }

            button.disabled = false;

            button.innerHTML = originalButtonText;

        }
    }


    /* --------------------------------
       INITIALIZE
    -------------------------------- */

    updatePreview();


    /* --------------------------------
       DEMO DATA
    -------------------------------- */

    // document.addEventListener("DOMContentLoaded", function () {
    //
    //     document.getElementById("firstName").value = "John";
    //
    //     document.getElementById("lastName").value = "Smith";
    //
    //     document.getElementById("workDirection").value = "Frontend Developer";
    //
    //     document.getElementById("city").value = "Amsterdam";
    //
    //     document.getElementById("email").value = "john.smith@example.com";
    //
    //     document.getElementById("phone").value = "+31 6 12345678";
    //
    //     document.getElementById("about").value =
    //         "Frontend developer with experience in building modern web applications. I am a team player, learn new technologies quickly, and pay close attention to code quality.";
    //
    //     document.getElementById("qualities").value =
    //         "Responsibility, attention to detail, communication skills, analytical thinking, and teamwork.";
    //
    //     document.getElementById("careerGoal").value =
    //         "I aim to grow in frontend development, create user-friendly interfaces, and contribute to exciting international projects.";
    //
    //     document.getElementById("institution").value =
    //         "Amsterdam University of Applied Sciences";
    //
    //     document.getElementById("specialty").value =
    //         "Information Technology";
    //
    //     document.getElementById("studyStart").value = "2020";
    //
    //     document.getElementById("studyEnd").value = "2024";
    //
    //     document.getElementById("programming").value =
    //         "HTML, CSS, JavaScript, TypeScript, Python";
    //
    //     document.getElementById("programs").value =
    //         "Visual Studio Code, Git, GitHub, Figma, WebStorm";
    //
    //     document.getElementById("languages").value =
    //         "French — Native, English — B2, Dutch — A2";
    //
    //     document.getElementById("projectName").value =
    //         "ResumeCV — Resume Builder";
    //
    //     document.getElementById("projectDescription").value =
    //         "Development of a web application for creating professional resumes with a live preview and PDF export functionality.";
    //
    //     document.getElementById("technologies").value =
    //         "HTML, CSS, JavaScript, Python, Django, Bootstrap";
    //
    //     document.getElementById("results").value =
    //         "Created a responsive interface, implemented dynamic resume updates, and developed PDF document export functionality.";
    //
    //     updatePreview();
    //
    // });