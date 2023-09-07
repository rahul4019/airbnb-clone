import React from 'react';

const Footer = () => {
  return (
    <div className="w-full  bg-gray-100 pb-8 flex justify-center">
      <div className="w-full max-w-screen-xl flex flex-col items-center px-6">
        {/* grid for links */}
        <div className="py-8  w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ">
          <div className="flex flex-col gap-1">
            <strong className="font-medium">Support</strong>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Help Center
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Get help with a safety issue
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Air cover
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Anti-discrimination
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Disablity support
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Cancellation options
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Report neighbourhood concern
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-medium">Hosting</strong>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Airbnb your home
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                AirCover for Hosts
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Hosting resources
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Community forum
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Hosting responsibly
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-medium">Airbnb</strong>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Newsroom
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                New features
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Careers
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Investors
              </span>
            </p>
            <p>
              <span className="font-normal text-gray-700 cursor-pointer hover:underline underline-offset-1 decoration-1">
                Airbnb.org emergency stays
              </span>
            </p>
          </div>
        </div>

        <div className="border-[1px] border-gray-200 w-full my-4"></div>

        <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4 md:gap-0">
          <div className="flex mt-4 gap-10 md:order-last w-full md:w-auto justify-between">
            <div className="font-semibold text-sm flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              English(IN) <span className="mx-4">₹ INR</span>
            </div>
            <div className="flex gap-3">
              {/* facebook icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                viewBox="0 0 50 50"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
              </svg>

              {/* twitter icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                viewBox="0 0 50 50"
              >
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>

              {/* instagram icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 cursor-pointer"
                viewBox="0 0 50 50"
              >
                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
              </svg>
            </div>
          </div>

          <div className="text-gray-700 font-normal flex flex-col md:flex-row md:gap-8 md:items-center w-full md:w-auto gap-2 px-1">
            <p className="text-sm">&copy; 2023 Airbnb, Inc.</p>
            <p>
              <ul className=" flex gap-6 text-sm text-gray-700">
                <li className="md:list-disc cursor-pointer hover:underline underline-offset-1 decoration-1 text-gray-700">
                  Privacy
                </li>
                <li className="list-disc cursor-pointer hover:underline underline-offset-1 decoration-1 text-gray-700">
                  Terms
                </li>
                <li className="list-disc cursor-pointer hover:underline underline-offset-1 decoration-1 text-gray-700">
                  Sitemap
                </li>
                <li className="list-disc cursor-pointer hover:underline underline-offset-1 decoration-1 text-gray-700">
                  Company details
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
