import { useState } from "react";
import emailjs from "@emailjs/browser";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  dob: string;
  nationality: string;
  address: string;
  qualification: string;
  englishCompetency: string;
  vaccinated: string;
  workshop: string;
  classStartDate: string;
  salesperson: string;
  hearAboutUs: string;
  timestamp?: string;
  formType?: string;
}

//TODO: installed zod, and react hook form and clean up the form into components (form-input, form-select)
const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "SG +65",
    phone: "",
    dob: "",
    nationality: "",
    address: "",
    qualification: "Primary",
    englishCompetency: "Competent",
    vaccinated: "",
    workshop: "",
    classStartDate: "",
    salesperson: "",
    hearAboutUs: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmailNotification = async (data: RegistrationData) => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    const emailParams = {
      to_email: data.email,
      to_name: `${data.firstName} ${data.lastName}`,
      order_number: "#1234567890",
      today_date: new Date().toLocaleDateString(),
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: `${data.countryCode} ${data.phone}`,
      address: data.address,
      nationality: data.nationality,
      course: data.workshop,
      gst_percentage: "8%",
      gst_amount: 2.4,
      course_code: "TGS-20200501529",
      pax: 1,
      grand_total_excl_tax: 30,
      course_price: 30,
      subtotal: 30,
      final_total: 30,
      discount: 0,
      class_start_date: data.classStartDate,
      qualification: data.qualification,
      english_competency: data.englishCompetency,
      hear_about_us: data.hearAboutUs,
      vaccinated: data.vaccinated,
      salesperson: data.salesperson,
      timestamp: data.timestamp,
    };

    try {
      const response = await emailjs.send(serviceID, templateID, emailParams);
      console.log("Email sent successfully!", response.status, response.text);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email: " + JSON.stringify(error));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setShowSuccess(false);

    const registrationData = {
      ...formData,
      timestamp: new Date().toISOString(),
      formType: "workshop_registration",
    };

    try {
      console.log("Registration Data:", registrationData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      setShowSuccess(true);

      await sendEmailNotification(registrationData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "SG +65",
        phone: "",
        dob: "",
        nationality: "",
        address: "",
        qualification: "Primary",
        englishCompetency: "Competent",
        vaccinated: "",
        workshop: "",
        classStartDate: "",
        salesperson: "",
        hearAboutUs: "",
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-xl rounded-lg mt-5 mb-5">
      <div className="text-center mb-10 py-5 border-b-2 border-primary">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Workshop Registration Form
        </h1>
        <p className="text-lg text-secondary">
          Fill in the form and we will get back to you shortly.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl text-forground mb-5 border-b-2 border-primary pb-2">
          1. Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-5">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block mb-2 font-medium text-forground"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block mb-2 font-medium text-forground"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-forground"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-forground"
            >
              Phone Number *
            </label>
            <div className="flex gap-3 items-end">
              <div className="w-40">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
                >
                  <option value="SG +65">SG +65</option>
                  <option value="MY +60">MY +60</option>
                  <option value="TH +66">TH +66</option>
                  <option value="ID +62">ID +62</option>
                  <option value="PH +63">PH +63</option>
                  <option value="VN +84">VN +84</option>
                  <option value="US +1">US +1</option>
                  <option value="UK +44">UK +44</option>
                  <option value="AU +61">AU +61</option>
                  <option value="CN +86">CN +86</option>
                  <option value="JP +81">JP +81</option>
                  <option value="KR +82">KR +82</option>
                  <option value="IN +91">IN +91</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block mb-2 font-medium text-forground"
            >
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="nationality"
              className="block mb-2 font-medium text-forground"
            >
              Nationality *
            </label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
            >
              <option value="">Select Nationality</option>
              <option value="Singaporean">Singaporean</option>
              <option value="PR">PR</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 font-medium text-forground"
            >
              Home Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="qualification"
              className="block mb-2 font-medium text-forground"
            >
              Highest Qualification
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Diploma/A-Levels">Diploma/A-Levels</option>
              <option value="Degree">Degree</option>
              <option value="Masters">Masters</option>
              <option value="PHD">PHD</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="englishCompetency"
              className="block mb-2 font-medium text-forground"
            >
              English Competency
            </label>
            <select
              id="englishCompetency"
              name="englishCompetency"
              value={formData.englishCompetency}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
            >
              <option value="Competent">Competent</option>
              <option value="Not competent">Not competent</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-forground">
              Fully vaccinated?
            </label>
            <div className="flex gap-5 mt-3">
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  id="vaccinated-yes"
                  name="vaccinated"
                  value="Yes"
                  checked={formData.vaccinated === "Yes"}
                  onChange={handleInputChange}
                  className="w-auto m-0"
                />
                <label htmlFor="vaccinated-yes">Yes</label>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  id="vaccinated-no"
                  name="vaccinated"
                  value="No"
                  checked={formData.vaccinated === "No"}
                  onChange={handleInputChange}
                  className="w-auto m-0"
                />
                <label htmlFor="vaccinated-no">No</label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="workshop"
              className="block mb-2 font-medium text-forground"
            >
              Choose Workshop
            </label>
            <select
              id="workshop"
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
            >
              <option value="">Choose an option</option>
              <option value="TikTok Social Media Marketing">
                TikTok Social Media Marketing
              </option>
              <option value="Visual Content Essentials">
                Visual Content Essentials
              </option>
              <option value="Videography & Editing">
                Videography & Editing
              </option>
              <option value="Mobile Photography">Mobile Photography</option>
              <option value="AI-Driven Graphic Design">
                AI-Driven Graphic Design
              </option>
              <option value="Acrylic Painting (Colour Concept)">
                Acrylic Painting (Colour Concept)
              </option>
              <option value="Sketching and Watercolour Painting">
                Sketching and Watercolour Painting
              </option>
              <option value="Digital Art with Procreate">
                Digital Art with Procreate
              </option>
              <option value="Canva for Social Media">
                Canva for Social Media
              </option>
              <option value="DJ Sound Mixing">DJ Sound Mixing</option>
              <option value="Peranakan Cuisine">Peranakan Cuisine</option>
              <option value="Japanese Cuisine">Japanese Cuisine</option>
              <option value="Delicious Bento">Delicious Bento</option>
              <option value="Dim Sum">Dim Sum</option>
              <option value="Hawker Delights">Hawker Delights</option>
              <option value="Korean Delights">Korean Delights</option>
              <option value="Thai Cuisine">Thai Cuisine</option>
              <option value="Plant Based Delights">Plant Based Delights</option>
              <option value="Artisan Candle Design">
                Artisan Candle Design
              </option>
              <option value="Artisan Cosmetic Material Design">
                Artisan Cosmetic Material Design
              </option>
              <option value="Perfumery Product Design">
                Perfumery Product Design
              </option>
              <option value="Artisanal Soap Making Craft">
                Artisanal Soap Making Craft
              </option>
              <option value="Specialty Perfumery Craft">
                Specialty Perfumery Craft
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="classStartDate"
              className="block mb-2 font-medium text-forground"
            >
              Class Start Date
            </label>
            <input
              type="date"
              id="classStartDate"
              name="classStartDate"
              value={formData.classStartDate}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="salesperson"
              className="block mb-2 font-medium text-forground"
            >
              Please provide the salesperson's name (if applicable)
            </label>
            <input
              type="text"
              id="salesperson"
              name="salesperson"
              value={formData.salesperson}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="hearAboutUs"
              className="block mb-2 font-medium text-forground"
            >
              How did you hear about us?
            </label>
            <select
              id="hearAboutUs"
              name="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-secondary-light rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 cursor-pointer"
            >
              <option value="">Choose an option</option>
              <option value="Social Media">Social Media</option>
              <option value="Google">Google</option>
              <option value="Friends">Friends</option>
              <option value="Sales Booth">Sales Booth</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="bg-muted p-4 border-l-4 border-primary rounded-r-lg my-5">
            <p className="mb-1 text-sm text-secondary">
              <strong>*Note:</strong>
            </p>
            <p className="mb-1 text-sm text-secondary">
              We will contact you regarding a $30 refundable deposit.
            </p>
            <p className="text-sm text-secondary">
              This deposit will be returned upon course completion.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-4 px-10 rounded-lg text-lg font-bold cursor-pointer transition-colors hover:bg-primary-dark disabled:bg-secondary-light disabled:cursor-not-allowed mt-5"
          >
            Submit
          </button>
        </form>

        {showSuccess && (
          <div className="bg-success-light text-success-dark p-4 rounded-lg mt-5 text-center font-bold">
            <p>Thanks for submitting!</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center mt-5">
            <div className="inline-block w-10 h-10 border-4 border-secondary-light border-t-primary rounded-full animate-spin mb-2"></div>
            <p className="text-secondary">Processing your registration...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
