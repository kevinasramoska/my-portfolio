export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Me</h2>

        <form
          action="https://formsubmit.co/kevinas530@gmail.com"
          method="POST"
          className="max-w-md mx-auto bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A] shadow-lg"
        >
          {/* FormSubmit Settings */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New message from your portfolio!" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_autoresponse" value="Thanks for reaching out! I’ll get back to you shortly." />

          <div className="mb-5">
            <label htmlFor="name" className="block mb-1 text-[#D4C9C1]">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded-md bg-[#121212] border border-[#2A2A2A] 
              text-[#E0D7CF] focus:outline-none focus:border-[#5C3D2E]"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 text-[#D4C9C1]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-md bg-[#121212] border border-[#2A2A2A] 
              text-[#E0D7CF] focus:outline-none focus:border-[#5C3D2E]"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-1 text-[#D4C9C1]">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full p-3 rounded-md bg-[#121212] border border-[#2A2A2A] 
              text-[#E0D7CF] focus:outline-none focus:border-[#5C3D2E]"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5C3D2E] text-white py-3 rounded-md font-semibold 
            hover:bg-[#4A2F23] transition"
          >
            Send Message
          </button>
        </form>

        <p className="text-center mt-8 text-[#D4C9C1]">
          Or reach me directly at:{" "}
          <a
            href="mailto:kevinas530@gmail.com"
            className="text-[#5C3D2E] hover:underline"
          >
            kevinas530@gmail.com
          </a>
        </p>

        <div className="mt-12 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
