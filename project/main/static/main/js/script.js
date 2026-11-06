document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       DETECT CURRENT PAGE
    ================================================ */

    const currentPath = window.location.pathname.replace(/\/+$/, "");

    const isResumePage = currentPath === "/resume";
    const isEditorPage = Boolean(document.getElementById("resumeForm"));


    /* ================================================
       HELPER FUNCTIONS
    ================================================ */

    function getValue(field) {
        return field ? field.value.trim() : "";
    }


    function setText(element, value, fallback = "") {

        if (typeof element === "string") {
            element = document.getElementById(element);
        }

        if (element) {
            element.textContent = value || fallback;
        }
    }


    function createEducationEntry(item, container) {

        if (
            !item.institution &&
            !item.specialty &&
            !item.start &&
            !item.end
        ) {
            return;
        }

        const entry = document.createElement("div");
        entry.className = "resume-entry";

        if (item.institution) {
            const title = document.createElement("strong");
            title.textContent = item.institution;
            entry.appendChild(title);
        }

        const period = [
            item.start,
            item.end
        ].filter(Boolean).join(" – ");

        if (period) {
            const small = document.createElement("small");
            small.textContent = period;
            entry.appendChild(small);
        }

        if (item.specialty) {
            const description = document.createElement("p");
            description.textContent = item.specialty;
            entry.appendChild(description);
        }

        container.appendChild(entry);
    }


    /* ================================================
       EDITOR PAGE
    ================================================ */

    if (isEditorPage) {

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


        /* ================================================
           ADDITIONAL EDUCATION
        ================================================ */

        function renderAdditionalEducation() {

            const container = document.getElementById("additionalEducation");

            const previewContainer = document.getElementById(
                "previewAdditionalEducation"
            );

            if (!container || !previewContainer) return;

            previewContainer.replaceChildren();

            container.querySelectorAll(".additional-education-item")
                .forEach(function (item) {

                    createEducationEntry({

                        institution: getValue(item.querySelector(".extra-institution")),
                        specialty: getValue(item.querySelector(".extra-specialty")),
                        start: getValue(item.querySelector(".extra-study-start")),
                        end: getValue(item.querySelector(".extra-study-end"))

                    }, previewContainer);

                });
        }


        /* ================================================
           LIVE PREVIEW
        ================================================ */

        function updatePreview() {

            const firstName = getValue(fields.firstName);
            const lastName = getValue(fields.lastName);

            const fullName = `${firstName} ${lastName}`.trim();

            setText(preview.name, fullName, "Your First and Last Name");

            setText(preview.workDirection, getValue(fields.workDirection), "Desired Position");

            setText(
                preview.city,
                getValue(fields.city) ? "📍 " + getValue(fields.city) : "📍 City"
            );

            setText(
                preview.email,
                getValue(fields.email) ? "✉ " + getValue(fields.email) : "✉ Email"
            );

            setText(
                preview.phone,
                getValue(fields.phone) ? "☎ " + getValue(fields.phone) : "☎ Phone"
            );

            setText(preview.about, getValue(fields.about), "—");
            setText(preview.qualities, getValue(fields.qualities), "—");
            setText(preview.careerGoal, getValue(fields.careerGoal), "—");

            setText(preview.institution, getValue(fields.institution), "Educational Institution");
            setText(preview.specialty, getValue(fields.specialty), "Field of Study");

            const studyStart = getValue(fields.studyStart);
            const studyEnd = getValue(fields.studyEnd);

            let studyPeriod = "Study Period";

            if (studyStart || studyEnd) {
                studyPeriod = `${studyStart || "—"} – ${studyEnd || "Present"}`;
            }

            setText(preview.studyPeriod, studyPeriod);

            setText(preview.programming, getValue(fields.programming), "—");
            setText(preview.programs, getValue(fields.programs), "—");
            setText(preview.languages, getValue(fields.languages), "—");

            setText(preview.projectName, getValue(fields.projectName), "Project Name or Position");
            setText(preview.projectDescription, getValue(fields.projectDescription), "Project or work experience description.");
            setText(preview.technologies, getValue(fields.technologies), "Technologies used");
            setText(preview.results, getValue(fields.results), "Achievements");

            renderAdditionalEducation();
        }


        /* ================================================
           ADD EDUCATION
        ================================================ */

        function addEducation() {

            const container = document.getElementById("additionalEducation");

            if (!container) return;

            const item = document.createElement("div");

            item.className = "additional-education-item";

            item.style.cssText = `
                padding: 18px;
                margin-top: 16px;
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

            item.querySelectorAll("input").forEach(function (input) {
                input.addEventListener("input", updatePreview);
                input.addEventListener("change", updatePreview);
            });

            item.querySelector(".remove-education").addEventListener(
                "click",
                function () {
                    item.remove();
                    updatePreview();
                }
            );

            updatePreview();
        }

        window.addEducation = addEducation;


        /* ================================================
           FORM LISTENERS
        ================================================ */

        Object.values(fields).forEach(function (field) {

            if (!field) return;

            field.addEventListener("input", updatePreview);
            field.addEventListener("change", updatePreview);

        });


        /* ================================================
           PHOTO
        ================================================ */

        const photoInput = document.getElementById("photo");

        // Если в HTML используется общий шаблон — resumePhoto.
        // Если в index.html осталось previewPhoto, используем его.
        const previewPhoto = document.getElementById("resumePhoto") ||
                             document.getElementById("previewPhoto");

        const photoPlaceholder = document.getElementById("photo-placeholder");

        function updatePhotoFromUrl() {

            if (!photoInput || !previewPhoto || !photoPlaceholder) return;

            const url = photoInput.value.trim();

            if (!url) {

                previewPhoto.removeAttribute("src");
                previewPhoto.style.display = "none";
                photoPlaceholder.style.display = "flex";

                return;
            }

            previewPhoto.onload = function () {
                previewPhoto.style.display = "block";
                photoPlaceholder.style.display = "none";
            };

            previewPhoto.onerror = function () {
                previewPhoto.style.display = "none";
                photoPlaceholder.style.display = "flex";
            };

            previewPhoto.src = url;
        }


        if (photoInput) {

            photoInput.addEventListener("input", function () {

                const photoFile = document.getElementById("photoFile");

                if (photoFile) {
                    photoFile.value = "";
                }

                updatePhotoFromUrl();
            });
        }


        /* ================================================
           PHOTO FROM DEVICE
        ================================================ */

        const photoFile = document.getElementById("photoFile");
        const photoFileName = document.getElementById("photoFileName");

        if (photoFile) {

            photoFile.addEventListener("change", function (event) {

                const file = event.target.files[0];

                if (!file) {

                    if (photoFileName) {
                        photoFileName.textContent = "No file selected";
                    }

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

                    if (photoFileName) {
                        photoFileName.textContent = "No file selected";
                    }

                    return;
                }

                const maxSize = 8 * 1024 * 1024;

                if (file.size > maxSize) {

                    alert("The photo size must not exceed 8 MB.");

                    photoFile.value = "";

                    if (photoFileName) {
                        photoFileName.textContent = "No file selected";
                    }

                    return;
                }

                if (photoFileName) {
                    photoFileName.textContent = file.name;
                }

                const reader = new FileReader();

                reader.onload = function (event) {

                    if (!previewPhoto || !photoPlaceholder) return;

                    previewPhoto.onload = function () {
                        previewPhoto.style.display = "block";
                        photoPlaceholder.style.display = "none";
                    };

                    previewPhoto.onerror = function () {
                        previewPhoto.style.display = "none";
                        photoPlaceholder.style.display = "flex";
                    };

                    previewPhoto.src = event.target.result;
                };

                reader.onerror = function () {
                    alert("Unable to read the file.");
                };

                reader.readAsDataURL(file);

            });
        }


        /* ================================================
           WAIT FOR IMAGES
        ================================================ */

        async function waitForImages(container) {

            const images = Array.from(container.querySelectorAll("img"));

            await Promise.all(
                images.map(function (img) {

                    if (!img.src || img.complete) {
                        return Promise.resolve();
                    }

                    return new Promise(function (resolve) {

                        img.onload = resolve;
                        img.onerror = resolve;

                        setTimeout(resolve, 10000);
                    });

                })
            );
        }


        /* ================================================
           DOWNLOAD PDF
        ================================================ */

        async function downloadPDF() {

            const resume = document.getElementById("resume-paper");
            const button = document.getElementById("downloadPDFButton");

            if (!resume) {
                alert("Unable to find the resume.");
                return;
            }

            if (typeof html2pdf === "undefined") {
                alert("The PDF library failed to load. Check your internet connection and refresh the page.");
                return;
            }

            const originalButtonText = button ? button.innerHTML : "";

            if (button) {
                button.disabled = true;
                button.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Creating PDF...
                `;
            }

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

                await new Promise(function (resolve) {
                    requestAnimationFrame(function () {
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

                alert("Unable to create the PDF. Please try again. If you are using an external photo, check whether the image is accessible.");

            } finally {

                if (clone && clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }

                if (button) {
                    button.disabled = false;
                    button.innerHTML = originalButtonText;
                }
            }
        }

        window.downloadPDF = downloadPDF;


        /* ================================================
           SAVE RESUME DATA
        ================================================ */

        function saveResumeData(resumeData) {

            try {

                sessionStorage.setItem(
                    "resumeData",
                    JSON.stringify(resumeData)
                );

                window.location.href = "/resume/";

            } catch (error) {

                console.error("Unable to save resume data:", error);

                alert("Unable to save your resume. The photo may be too large. Try using a smaller image.");
            }
        }


        /* ================================================
           VIEW RESUME
        ================================================ */

        window.viewResume = function () {

            const resumeData = {};

            const fieldIds = [
                "firstName", "lastName", "workDirection",
                "city", "email", "phone",
                "about", "qualities", "careerGoal",
                "institution", "specialty", "studyStart", "studyEnd",
                "programming", "programs", "languages",
                "projectName", "projectDescription", "technologies",
                "results", "photo"
            ];

            fieldIds.forEach(function (id) {

                const field = document.getElementById(id);

                if (field) {
                    resumeData[id] = field.value.trim();
                }
            });


            resumeData.additionalEducation = [];

            document.querySelectorAll(".additional-education-item")
                .forEach(function (item) {

                    resumeData.additionalEducation.push({

                        institution: getValue(item.querySelector(".extra-institution")),
                        specialty: getValue(item.querySelector(".extra-specialty")),
                        start: getValue(item.querySelector(".extra-study-start")),
                        end: getValue(item.querySelector(".extra-study-end"))

                    });
                });


            const uploadedPhoto = document.getElementById("photoFile");

            if (uploadedPhoto && uploadedPhoto.files.length > 0) {

                const file = uploadedPhoto.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {

                    resumeData.photo = event.target.result;

                    saveResumeData(resumeData);
                };

                reader.onerror = function () {
                    alert("Unable to read the selected photo.");
                };

                reader.readAsDataURL(file);

            } else {

                saveResumeData(resumeData);
            }
        };


        /* ================================================
           INITIALIZE EDITOR
        ================================================ */

        updatePreview();
        updatePhotoFromUrl();

    }


    /* ================================================
       RESUME PAGE
    ================================================ */

    if (isResumePage) {

        const savedData = sessionStorage.getItem("resumeData");

        if (!savedData) {
            window.location.replace("/");
            return;
        }

        let data;

        try {

            data = JSON.parse(savedData);

            if (!data || typeof data !== "object") {
                throw new Error("Invalid resume data");
            }

        } catch (error) {

            console.error("Resume data error:", error);

            sessionStorage.removeItem("resumeData");

            window.location.replace("/");
            return;
        }


        /* PERSONAL INFORMATION */

        const fullName = [
            data.firstName,
            data.lastName
        ].filter(Boolean).join(" ");

        setText("previewName", fullName, "Your First and Last Name");
        setText("previewWorkDirection", data.workDirection, "Desired Position");


        /* CONTACT INFORMATION */

        setText("previewCity", data.city ? "📍 " + data.city : "📍 City");
        setText("previewEmail", data.email ? "✉ " + data.email : "✉ Email");
        setText("previewPhone", data.phone ? "☎ " + data.phone : "☎ Phone");


        /* PHOTO */

        const photo = document.getElementById("resumePhoto") ||
                      document.getElementById("previewPhoto");

        const placeholder = document.getElementById("photo-placeholder");

        if (photo) {

            if (data.photo) {

                photo.onload = function () {
                    photo.style.display = "block";

                    if (placeholder) {
                        placeholder.style.display = "none";
                    }
                };

                photo.onerror = function () {
                    photo.style.display = "none";

                    if (placeholder) {
                        placeholder.style.display = "flex";
                    }
                };

                photo.src = data.photo;

            } else {

                photo.style.display = "none";

                if (placeholder) {
                    placeholder.style.display = "flex";
                }
            }
        }


        /* ABOUT ME */

        setText("previewAbout", data.about, "—");


        /* PERSONAL QUALITIES */

        setText("previewQualities", data.qualities, "—");


        /* CAREER OBJECTIVE */

        setText("previewCareerGoal", data.careerGoal, "—");


        /* EDUCATION */

        setText("previewInstitution", data.institution, "Educational Institution");
        setText("previewSpecialty", data.specialty, "Field of Study");

        const studyStart = data.studyStart || "";
        const studyEnd = data.studyEnd || "";

        let studyPeriod = "Study Period";

        if (studyStart || studyEnd) {
            studyPeriod = `${studyStart || "—"} – ${studyEnd || "Present"}`;
        }

        setText("previewStudyPeriod", studyPeriod);


        /* ADDITIONAL EDUCATION */

        const additionalEducation = Array.isArray(data.additionalEducation)
            ? data.additionalEducation
            : [];

        const additionalContainer = document.getElementById(
            "previewAdditionalEducation"
        );

        if (additionalContainer) {

            additionalContainer.replaceChildren();

            additionalEducation.forEach(function (item) {
                createEducationEntry(item, additionalContainer);
            });
        }


        /* SKILLS */

        setText("previewProgramming", data.programming, "—");
        setText("previewPrograms", data.programs, "—");
        setText("previewLanguages", data.languages, "—");


        /* EXPERIENCE AND PROJECTS */

        setText("previewProjectName", data.projectName, "Project Name or Position");

        setText(
            "previewProjectDescription",
            data.projectDescription,
            "Project or work experience description."
        );

        setText("previewTechnologies", data.technologies, "Technologies used");
        setText("previewResults", data.results, "Achievements");

    }

});