import NavBar from "./Navbar";
import image1 from "./imgs/1.jpg";
import image2 from "./imgs/2.jpg";
import image3 from "./imgs/3.jpg";
import image4 from "./imgs/4.jpg";
import image5 from "./imgs/5.jpg";
import image6 from "./imgs/6.jpg";
import React, { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import instructionGif from "./imgs/paste.gif";
import ResponsiveCarousel from "./twitchVid";
import merong from "./imgs/merong.jpg";

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [budget, setBudget] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [ledWallSize, setLedWallSize] = useState(null);
  const [soundsOption, setSoundsOption] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [eventKind, setEventKind] = useState("");
  const [eventSubOption, setEventSubOption] = useState("");
  const [otherEvent, setOtherEvent] = useState("");
  const [setupType, setSetupType] = useState("");
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedGadgets, setSelectedGadgets] = useState([]);
  const [hasAfterParty, setHasAfterParty] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showForm, setShowForm] = useState(false);
  const botToken = "7433216671:AAGnNhqqZ_8__moNZBeoX2tO7506sTpt2AE";
  const chatId = "-4259816805";

  useEffect(() => {
    // Create an immediately invoked async function to use await within it.
    (async () => {
      if (localStorage.getItem("visited") !== "yes") {
        localStorage.setItem("visited", "yes");

        try {
          const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: "A new visitor arrived on your website!",
              }),
            }
          );

          if (response.ok) {
            console.log("Booking details sent to Telegram successfully!");
          } else {
            console.error(
              "Failed to send booking details to Telegram:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("An error occurred while sending to Telegram:", error);
        }
      }
    })(); // Call the async function immediately
  }, []); // Empty dependency array ensures this runs only once on mount

  // Define price variables at the component level
  const ledWallPrices = {
    "7ft x 7ft": 12000,
    "7ft x 9ft": 15000,
    "7ft x 12ft": 18000,
  };
  const soundsPrices = {
    "Professional set up": 25000,
    "Disco mobile with 12 subs": 12000,
  };

  // Combined Price Information (single variable)
  const prices = {
    ledWall: ledWallPrices,
    sounds: soundsPrices,
  };

  // Calculate if any of the required services are selected
  const isAdditionalGadgetsEnabled = selectedServices.some((service) =>
    [
      "Staging",
      "Trusses",
      "Backline",
      "Roofing",
      "Band Equipments",
      "Sounds",
      "Led Wall",
      "Afterparty",
    ].includes(service)
  );

  const handleGadgetChange = (gadget) => {
    if (setupType === "") {
      alert("Please select a Setup Type first.");
      return;
    }
    let updatedGadgets;
    if (selectedGadgets.includes(gadget)) {
      updatedGadgets = selectedGadgets.filter((item) => item !== gadget);
    } else {
      updatedGadgets = [...selectedGadgets, gadget];
    }
    setSelectedGadgets(updatedGadgets);
    calculateTotalCost(
      selectedServices,
      ledWallSize,
      soundsOption,
      updatedGadgets
    );
  };

  const handleSetupTypeChange = (event) => {
    setSetupType(event.target.value);
  };

  const calculateTotalCost = (
    services,
    ledSize,
    soundOption,
    selectedGadgets = []
  ) => {
    let cost = 0;

    // Initialize with default or zero value
    ledSize = ledSize || "7ft x 7ft"; // Default to the smallest LED wall size
    soundOption = soundOption || "Professional set up"; // Default to Professional setup

    services.forEach((service) => {
      switch (service) {
        case "Led Wall":
          cost += ledWallPrices[ledSize] || 0;
          break;
        case "Sounds":
          cost += soundsPrices[soundOption] || 0;
          break;
        case "Band Equipments":
          cost += 18000;
          break;
        case "Backline":
          cost += 20000;
          break;
        default:
          break;
      }
    });

    // Add the cost of selected gadgets
    selectedGadgets.forEach((gadget) => {
      switch (gadget) {
        case "Sparkular x 2":
          cost += 3500;
          break;
        case "Followspot":
          cost += 5000;
          break;
        case "Smoke machine":
          cost += 2500;
          break;
        case "Fog machine":
          cost += 3500;
          break;
        default:
          break;
      }
    });

    setTotalCost(cost);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSoundsOptionClick = (option) => {
    if (setupType === "") {
      // Check if setupType is selected
      alert("Please select a Setup Type first.");
      return; // Prevent selection if no setupType
    }
    setSoundsOption(option);
    calculateTotalCost(selectedServices, ledWallSize, option);
  };

  const handleServiceClick = (service) => {
    if (setupType === "") {
      alert("Please select a Setup Type first.");
      return;
    }
    setSelectedServices((prevServices) => {
      let updatedServices;
      if (prevServices.includes(service)) {
        updatedServices = prevServices.filter((s) => s !== service);
      } else {
        updatedServices = [...prevServices, service];
      }

      calculateTotalCost(
        updatedServices,
        ledWallSize,
        soundsOption,
        selectedGadgets
      );

      return updatedServices;
    });

    if (
      service !== "Led Wall" &&
      service !== "Sounds" &&
      selectedServices.includes(service)
    ) {
      calculateTotalCost(
        selectedServices,
        ledWallSize,
        soundsOption,
        selectedGadgets
      );
    }
  };

  const handleLedWallSizeClick = (size) => {
    if (setupType === "") {
      alert("Please select a Setup Type first.");
      return;
    }
    setLedWallSize(size);
    calculateTotalCost(selectedServices, size, soundsOption);
  };

  const handleBookNow = async () => {
    if (selectedServices.length === 0 || !selectedDate) {
      alert("Please select at least one service and a date.");
      return;
    }
    if (!fullName || !contactNumber) {
      alert("Please enter your full name and contact number.");
      return;
    }

    const formattedMessage = `Hi, I'd like to book the following services on ${selectedDate.toLocaleDateString()}:
Name: ${fullName}
Contact Number: ${contactNumber}
${selectedServices
  .map((service) => {
    let line = `- ${service}`;
    if (service === "Sounds" && soundsOption) {
      line += ` (${soundsOption}) - PHP ${prices.sounds[soundsOption]}`;
    } else if (service === "Led Wall" && ledWallSize) {
      line += ` (${ledWallSize}) - PHP ${prices.ledWall[ledWallSize]}`;
    } else if (service === "Band Equipments") {
      line += " - PHP 18000 (no monitor included)";
    } else if (service === "Backline") {
      line += " - PHP 20000 (Complete with Monitors)";
    }
    return line;
  })
  .join("\n")}
${
  selectedGadgets.length > 0
    ? `\nAdditional Gadgets:\n${selectedGadgets
        .map(
          (gadget) =>
            `- ${gadget} - PHP ${
              {
                "Sparkular x 2": 3500,
                Followspot: 5000,
                "Smoke machine": 2500,
                "Fog machine": 3500,
              }[gadget]
            }`
        )
        .join("\n")}`
    : ""
}

Event Kind: ${eventKind}${eventSubOption ? ` (${eventSubOption})` : ""}${
      otherEvent ? ` (Other: ${otherEvent})` : ""
    }
${hasAfterParty ? "- Afterparty" : ""}

My budget is PHP ${budget}.

Additional Info: ${additionalInfo}

Estimated Total Cost: PHP ${totalCost}
`;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = formattedMessage;
    document.body.appendChild(tempTextArea);

    try {
      await navigator.clipboard.writeText(formattedMessage);
      setShowPopup(true);
    } catch (err) {
      iosCopyToClipboard(tempTextArea);
      setShowPopup(true);
    } finally {
      document.body.removeChild(tempTextArea);
    }

    // *** Send message to Telegram group chat ***

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: formattedMessage,
          }),
        }
      );

      if (response.ok) {
        console.log("Booking details sent to Telegram successfully!");
      } else {
        console.error(
          "Failed to send booking details to Telegram:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred while sending to Telegram:", error);
    }
  };

  const handleEventKindChange = (event) => {
    if (setupType === "") {
      alert("Please select a Setup Type first.");
      return;
    }
    setEventKind(event.target.value);
    setShowSubOptions(
      event.target.value === "professional setup" ||
        event.target.value === "mobile setup"
    );
    setEventSubOption("");
    setOtherEvent("");
  };

  const handleAfterPartyChange = (event) => {
    setHasAfterParty(event.target.checked);
  };

  const handleOtherEventChange = (event) => {
    setOtherEvent(event.target.value);
  };

  function iosCopyToClipboard(el) {
    var oldContentEditable = el.contentEditable,
      oldReadOnly = el.readOnly,
      range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand("copy");
  }

  const handleConfirmRedirect = () => {
    setShowPopup(false);

    const facebookPageId = "TornadoSoundsPerfection.ph";
    const ref = "BOOKING_REQUEST";
    const messengerUrl = `https://m.me/${facebookPageId}?ref=${ref}`;

    const text = `Hi, I'd like to book the following services on ${selectedDate.toLocaleDateString()}:
Name: ${fullName}
Contact Number: ${contactNumber}
${selectedServices
  .map((service) => {
    let line = `- ${service}`;
    if (service === "Sounds" && soundsOption) {
      line += ` (${soundsOption}) - PHP ${prices.sounds[soundsOption]}`;
    } else if (service === "Led Wall" && ledWallSize) {
      line += ` (${ledWallSize}) - PHP ${prices.ledWall[ledWallSize]}`;
    } else if (service === "Band Equipments") {
      line += " - PHP 18000 (no monitor included)";
    } else if (service === "Backline") {
      line += " - PHP 20000 (Complete with Monitors)";
    }
    return line;
  })
  .join("\n")}
    
Event Kind: ${eventKind}${eventSubOption ? ` (${eventSubOption})` : ""}${
      otherEvent ? ` (Other: ${otherEvent})` : ""
    }
    ${hasAfterParty ? "- Afterparty" : ""}

My budget is PHP ${budget}.
    
Additional Info: ${additionalInfo}
    
Estimated Total Cost: PHP ${totalCost}
    `;

    const encodedText = encodeURIComponent(text);
    const messengerUrlWithText = `${messengerUrl}&text=${encodedText}`;

    try {
      window.location.href = messengerUrlWithText;
    } catch (err) {
      console.error("Error opening Messenger:", err);
      window.location.href = messengerUrlWithText;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <NavBar />

      <main className="flex-grow lg:container mx-auto p-8 bg-black text-white poppins-regular lg:mt-10 mt-20">
        <ResponsiveCarousel />
        <section className=" bg-black h-96 mt-32 lg:mt-20" id="home">
          {/* <h2 className="text-7xl lg:text-5xl font-bold mb-4">
            Why Choose Us?
          </h2> */}
          <h2 className="text-7xl lg:text-5xl font-bold mb-4 ">
            Why choose us?
          </h2>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-col items-center p-3">
              {" "}
              <img src={merong} className="w-max h-max rounded-full" />
              <h1 className="font-bold mt-3 text-5xl lg:text-lg">
                Emirich Maloloy-on
              </h1>
              <h2 className="text-4xl lg:text-sm mb-10">Audio Engineer</h2>
            </div>

            <p className="text-4xl lg:text-lg w-auto mb-5 leading-normal">
              At Tornado Sound Perfection, we don’t just deliver sound; we
              create immersive auditory experiences that turn any event into an
              unforgettable occasion. With years of experience, our dedicated
              and passionate team provides high-quality audio and services. Our
              goal is to achieve your complete satisfaction and elevate the
              overall market standards and success.
            </p>
          </div>

          <h2 className="text-7xl lg:text-5xl font-bold mb-4">
            What Sets Us Apart
          </h2>
          <ul className="text-4xl space-y-7 lg:text-lg lg:space-y-4 leading-normal">
            {/* Bullet Points */}
            <li>
              <b>Curated Soundtracks:</b> We understand that every event has its
              own personality. Our DJs are masters at reading the crowd,
              curating playlists that match the mood and build excitement
              throughout the night.
            </li>
            <li>
              <b>Cutting-Edge Technology:</b> We invest in state-of-the-art
              sound and lighting equipment, ensuring crystal-clear audio and
              visually stunning displays that elevate your event to the next
              level.
            </li>
            <li>
              <b>Technical Expertise:</b> Our audio engineers are meticulous in
              their craft, ensuring optimal sound levels, seamless transitions,
              and the perfect balance of frequencies for an immersive sonic
              experience.
            </li>
            <li>
              <b>Reliability and Professionalism:</b> We take pride in our
              punctuality, professionalism, and commitment to exceeding your
              expectations. We handle all the technical details so you can focus
              on enjoying your event.
            </li>
          </ul>
        </section>

        <section
          className="text-center bg-black h-auto mt-[150rem] lg:mt-[30rem]"
          id="services"
        >
          <h2 className="text-7xl lg:text-5xl font-bold mb-4">
            Services we offer
          </h2>
          <div
            className="grid 
       grid-cols-1 
       lg:grid-cols-8 
       gap-4 mt-10 poppins-extrabold"
          >
            <p className="text-4xl lg:text-2xl">Band Equipments</p>
            <p className="text-4xl lg:text-2xl">Sounds</p>
            <p className="text-4xl lg:text-2xl">Lights</p>
            <p className="text-4xl lg:text-2xl">Led Wall</p>
            <p className="text-4xl lg:text-2xl">Staging</p>
            <p className="text-4xl lg:text-2xl">Trusses</p>
            <p className="text-4xl lg:text-2xl">Backline</p>
            <p className="text-4xl lg:text-2xl">Roofing</p>
          </div>

          <div className="container mx-auto px-1 py-2 lg:pt-24 mt-5">
            <div className="-m-1 flex flex-wrap lg:-m-2">
              <div className="flex w-8/9 flex-wrap">
                <div className="w-1/2 p-1 lg:p-2">
                  <img
                    src={image1}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image1)}
                  />
                </div>
                <div className="w-1/2 p-1 lg:p-2">
                  <img
                    src={image2}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image2)}
                  />
                </div>
                <div className="w-full p-1 lg:p-2">
                  <img
                    src={image3}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image3)}
                  />
                </div>
              </div>
              <div className="flex w-8/9 flex-wrap">
                <div className="w-full p-1 lg:p-2">
                  <img
                    src={image4}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image4)}
                  />
                </div>
                <div className="w-1/2 p-1 lg:p-2">
                  <img
                    src={image5}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image5)}
                  />
                </div>
                <div className="w-1/2 p-1 lg:p-2">
                  <img
                    src={image6}
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                    onClick={() => handleImageClick(image6)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Modal (Overlay) */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Enlarged"
                className="max-h-full max-w-full"
              />
            </div>
          )}
          <p className="text-3xl lg:text-xl text-center">
            Visit our{" "}
            <a
              href="https://www.facebook.com/TornadoSoundsPerfection.ph"
              target="_blank"
              rel="noreferrer"
              className="text-[#4267B2] poppins-extrabold"
            >
              Facebook
            </a>
            &nbsp;for more images.
          </p>
        </section>

        <section
          className="text-center bg-black h-96 mt-20 flex flex-col items-center justify-center"
          id="contact"
        >
          <h2 className="text-7xl lg:text-5xl font-bold mb-4">CONTACT US</h2>
          <p className="text-4xl lg:text-2xl flex flex-row">
            <FaPhoneAlt className="text-red-500 hover:text-red-700" size={28} />
            &nbsp; Emirich Maloloy-on: 0969 188 6427
          </p>
          {/* <p className="text-lg flex flex-row">
      <MdEmail className="text-red-500 hover:text-red-700" size={32} />
      &nbsp;tornadosoungperfection@gmail.com
     </p> */}
          <p className="text-4xl lg:text-2xl mt-5">
            <a
              href="https://www.facebook.com/TornadoSoundsPerfection.ph"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row"
              // Add some margin-top for spacing
            >
              <FaFacebook
                className="text-blue-500 hover:text-blue-700"
                size={32}
              />
              &nbsp;Tornado Sound Perfection
            </a>
          </p>
        </section>
        <section className="bg-gray-300 p-5 rounded-xl h-auto mt-20" id="book">
          <h2 className="text-6xl lg:text-4xl font-bold mb-4 text-black">
            Book Now
          </h2>
          {/* Popup Message */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md text-center">
                {/* GIF Instruction Video */}
                <img
                  src={instructionGif}
                  alt="Instruction Video"
                  className="mb-4"
                />

                <p className="text-black mb-4">
                  Request copied to clipboard. Please paste your request on
                  messenger. You will now be redirected to Facebook Messenger.
                </p>

                {/* OK Button */}
                <button
                  onClick={handleConfirmRedirect}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {!showForm && ( // Show name/contact form initially
            <div>
              <label
                htmlFor="fullName"
                className="block text-black text-4xl lg:text-lg mt-5 mb-5"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
              />

              <label
                htmlFor="contactNumber"
                className="block text-black text-4xl lg:text-lg mt-5 mb-5"
              >
                Contact Number:
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
              />

              <button
                onClick={() => setShowForm(true)}
                className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 poppins-extrabold text-6xl lg:text-xl"
              >
                Next
              </button>
            </div>
          )}

          {showForm && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="setupType"
                  className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                >
                  <b>Select Setup Type:</b>
                </label>
                <select
                  id="setupType"
                  value={setupType}
                  onChange={handleSetupTypeChange}
                  className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
                >
                  <option value="">Select Setup Type</option>
                  <option value="professional setup">Professional Setup</option>
                  <option value="mobile setup">Mobile Setup</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="eventKind"
                  className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                >
                  <b>Select Event Kind:</b>
                </label>
                <select
                  id="eventKind"
                  value={eventKind}
                  onChange={handleEventKindChange}
                  className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
                >
                  <option value="">Select Event Kind</option>
                  <option value="debut">Debut</option>
                  <option value="wedding">Wedding</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="christmas party">Christmas Party</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Display additional options only when Professional Setup or Mobile Setup is selected */}
              {showSubOptions && (
                <div>
                  <label
                    htmlFor="eventSubOption"
                    className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                  >
                    <b>
                      {setupType === "professional setup"
                        ? "Professional Setup"
                        : "Mobile Setup"}{" "}
                      Options:
                    </b>
                  </label>
                  <div className="flex flex-col space-y-2">
                    {/* Your additional sub-options radio buttons or textboxes can go here */}
                  </div>
                </div>
              )}

              {/* Display other event textbox only when Others is selected */}
              {eventKind === "others" && (
                <div>
                  <label
                    htmlFor="otherEvent"
                    className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                  >
                    <b>Other Event:</b>
                  </label>
                  <input
                    type="text"
                    id="otherEvent"
                    value={otherEvent}
                    onChange={handleOtherEventChange}
                    className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
                  />
                </div>
              )}

              {/* Afterparty Checkbox */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hasAfterParty}
                    onChange={handleAfterPartyChange}
                    className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                  />
                  <span className="text-black text-4xl lg:text-lg poppins-regular">
                    Afterparty
                  </span>
                </label>
              </div>
              {/* Checkbox Options */}
              {["Staging", "Trusses", "Backline", "Roofing"].map((service) => (
                <div key={service}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={service}
                      checked={selectedServices.includes(service)} // Connect to state
                      onChange={() => handleServiceClick(service)} // Add onClick
                      className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                    />
                    <span className="text-black text-4xl lg:text-lg poppins-regular">
                      {service}
                    </span>
                  </label>

                  {/* Additional Text for Staging */}
                  {service === "Staging" &&
                    selectedServices.includes("Staging") && (
                      <div className="ml-4 mt-2 space-y-1 text-lg">
                        <p className="text-black poppins-regular">
                          Contact us for more.
                        </p>
                      </div>
                    )}

                  {/* Additional Text for Roofing */}
                  {service === "Roofing" &&
                    selectedServices.includes("Roofing") && (
                      <div className="ml-4 mt-2 space-y-1 text-lg">
                        <p className="text-black poppins-regular">
                          Contact us for more.
                        </p>
                      </div>
                    )}

                  {/* Additional Text for Backline */}
                  {service === "Backline" &&
                    selectedServices.includes("Backline") && (
                      <div className="ml-4 mt-2 space-y-1 text-lg">
                        <p className="text-black poppins-regular">
                          <span className="text-green-700">PHP 20000 </span>-
                          Complete Band Equipments with Monitors
                        </p>
                      </div>
                    )}
                </div>
              ))}

              {/* Band Equipments with Price Below */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Band Equipments"
                    checked={selectedServices.includes("Band Equipments")}
                    onChange={() => handleServiceClick("Band Equipments")}
                    className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                  />
                  <span className="text-black text-4xl lg:text-lg poppins-regular">
                    Band Equipments
                  </span>
                </label>

                {selectedServices.includes("Band Equipments") && (
                  <div className="ml-4 mt-2 space-y-1 text-lg">
                    <p className="text-black poppins-regular">
                      <span className="text-green-700">PHP 18000</span> - Band
                      equipments only (no monitor included)
                    </p>
                  </div>
                )}
              </div>

              {/* Sounds with Sub-Options */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Sounds"
                    checked={selectedServices.includes("Sounds")}
                    onChange={() => handleServiceClick("Sounds")}
                    className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                  />
                  <span className="text-black text-4xl lg:text-lg poppins-regular">
                    Sounds
                  </span>
                </label>

                {selectedServices.includes("Sounds") && (
                  <div className="ml-4 mt-2 space-y-1">
                    {[
                      { option: "Professional set up", price: "25000" },
                      { option: "Disco mobile with 12 subs", price: "12000" },
                    ].map(({ option, price }) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 text-lg"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={soundsOption === option}
                          onChange={() => handleSoundsOptionClick(option)}
                          className="form-checkbox h-5 w-5 text-green-500 rounded-sm focus:ring-green-500"
                        />
                        <span className="text-black poppins-regular">
                          <span className="text-green-700">PHP {price}</span> -{" "}
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* LED Wall with Sub-Options (Combined) */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Led Wall"
                    checked={selectedServices.includes("Led Wall")}
                    onChange={() => handleServiceClick("Led Wall")}
                    className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                  />
                  <span className="text-black text-4xl lg:text-lg poppins-regular">
                    Led Wall
                  </span>
                </label>

                {/* Sub-Checkboxes (Immediately below, with styling) */}
                {selectedServices.includes("Led Wall") && (
                  <div className="ml-4 mt-2 space-y-1">
                    {[
                      { size: "7ft x 7ft", price: "12000" },
                      { size: "7ft x 9ft", price: "15000" },
                      { size: "7ft x 12ft", price: "18000" },
                    ].map(({ size, price }) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 text-lg"
                      >
                        <input
                          type="checkbox"
                          value={size}
                          checked={ledWallSize === size}
                          onChange={() => handleLedWallSizeClick(size)}
                          className="form-checkbox h-5 w-5 text-green-500 rounded-sm focus:ring-green-500"
                        />
                        <span className="text-black poppins-regular">
                          <span className="text-green-700">PHP {price}</span> -{" "}
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* {additional gadgets } */}
              <div>
                <label className="block text-black text-4xl lg:text-lg mt-5 mb-5">
                  <b>Additional Gadgets:</b>
                </label>
                {[
                  { name: "Sparkular x 2", price: 3500 },
                  { name: "Followspot", price: 5000 },
                  { name: "Smoke machine", price: 2500 },
                  { name: "Fog machine", price: 3500 },
                ].map(({ name, price }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedGadgets.includes(name)}
                      onChange={() => handleGadgetChange(name)}
                      className="form-checkbox h-8 w-8 text-green-500 rounded-sm focus:ring-green-500"
                      disabled={!isAdditionalGadgetsEnabled}
                    />
                    <span className="text-black text-4xl lg:text-lg poppins-regular">
                      <span className="text-green-700">PHP {price}</span> -{" "}
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Budget Input */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                >
                  <b>Your Budget:</b>
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 text-4xl lg:text-lg"
                />
              </div>
              {/* Display Total Cost */}
              <div className="lg:col-span-2 mt-4">
                <p className="text-black text-4xl lg:text-xl poppins-bold">
                  <b className="mr-2">Estimated Total Cost:</b>
                  <span className="text-green-700">PHP {totalCost}</span>
                </p>
              </div>

              {/* Date Picker */}
              <div>
                <label
                  htmlFor="schedule"
                  className="block text-black text-4xl lg:text-lg mt-5 mb-5"
                >
                  <b>Select Date:</b>
                </label>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  showOutsideDays
                  fixedWeeks
                  defaultMonth={new Date()}
                  className="text-3xl lg:text-lg p-4 bg-black rounded-xl w-min"
                  dayPickerProps={{
                    classNames: {
                      months: "font-bold",
                      caption: "text-gray-600",
                      weekdays: "text-gray-800",
                      weekdays_row: "flex justify-around",
                      day: "text-gray-900 hover:bg-gray-200 rounded-full p-2 cursor-pointer",
                      day_selected: "bg-blue-500 text-white",
                    },
                  }}
                />
              </div>

              {/* Additional Info */}
              <div className="lg:col-span-2 mt-1">
                <label
                  htmlFor="additionalInfo"
                  className="block text-black text-4xl lg:text-lg mb-2"
                >
                  <b>Additional Info/Requests:</b>
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-300 h-24 resize-y text-3xl lg:text-lg"
                />
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow} // Add onClick handler
                className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 poppins-extrabold text-6xl lg:text-xl"
              >
                Book Now
              </button>
            </div>
          )}
        </section>
        <footer className="bg-black p-4  text-center items-center poppins-medium text-3xl lg:text-xl mb-16 w-full">
          <p className="text-white">
            © {new Date().getFullYear()} <b>Tornado Sound Perfection</b>
          </p>
          <p className="text-white">
            <b>Made by Dan Lius Monsales</b>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
