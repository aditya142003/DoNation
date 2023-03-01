import React from "react";

const Admin = () => {
  return (
    <div>
      <body>
        <div class="flex space-x-[1030px] ">
          
            <div class="box-content h-6 w-64 p-4 bg-yellow-400">
              <h2 class="text-xl font-bold pl-4 text-lg text-white">
                Admin Panel
              </h2>
    
            </div>
         

          <div>
            <h1 class="text-2xl font-semibold">NGO Name</h1>
            <p class="text-zinc-300 text-lg">ngo@gamil.com</p>
          </div>
        </div>

        <div class="Div1 flex mt-14 space-x-[120px]">
          <div class="first px-24 py-14 shadow-2xl ml-20 rounded-lg ">
            <p class="text-3xl  -ml-16 ">Current Donation</p>
            <p class="text-2xl  mt-3 -ml-16">2500/ 30000</p>
          </div>

          <div class="first px-24 py-14 shadow-2xl  rounded-lg">
            <div>
              <p class="text-3xl -ml-16">Total Volunteers</p>
              <p class="text-2xl   mt-3 -ml-16">32</p>
            </div>
          </div>
          <div class="first px-24 py-14 shadow-2xl  rounded-lg">
            <p class="text-3xl -ml-16">Alert Board</p>
            <p class="text-2xl  mt-3 -ml-16">Tap To View</p>
          </div>
        </div>
        <div class="flex mt-14 mb-40">
          <div class="ml-20 w-3/4 shadow-2xl  rounded-lg box-content">
            <div class="Div2 px-16 mt-5">
              <p class="text-3xl font-medium pt-8">Recent Activity</p>

              <div class="flex space-x-[530px]">
                <div class="pt-10 flex space-x-[20px] ">
                  <div class="w-12 h-12 bg-zinc-400 rounded-full"></div>
                  <div>
                    <h2 class="font-medium text-xl">New Donation</h2>
                    <p class="text-zinc-300 text-lg">
                      User123 Donation 3 sets of clothes
                    </p>
                  </div>
                </div>
                <div class="pt-14">
                  <button class="text-zinc-300 text-lg">Tap to View </button>
                </div>
              </div>

              <div class="flex space-x-[530px]">
                <div class="pt-10 flex space-x-[20px] ">
                  <div class="w-12 h-12 bg-zinc-400 rounded-full"></div>
                  <div>
                    <h2 class="font-medium text-xl">New Donation</h2>
                    <p class="text-zinc-300 text-lg">
                      User123 Donation 3 sets of clothes
                    </p>
                  </div>
                </div>
                <div class="pt-14">
                  <button class="text-zinc-300 text-lg">Tap to View </button>
                </div>
              </div>

              <div class="flex space-x-[530px] mb-64">
                <div class="pt-10 flex space-x-[20px] ">
                  <div class="w-12 h-12 bg-zinc-400 rounded-full"></div>
                  <div>
                    <h2 class="font-medium text-xl">New Donation</h2>
                    <p class="text-zinc-300 text-lg">
                      User123 Donation 3 sets of clothes
                    </p>
                  </div>
                </div>
                <div class="pt-14">
                  <button class="text-zinc-300 text-lg">Tap to View </button>
                </div>
              </div>
            </div>
          </div>
          <div class="Div3">
            <ul class="ml-14">
              <li class="font-bold text-2xl mb-2">
                <button>More</button>
              </li>
              <li class="font-semibold text-xl mb-1">
                <button>Edit Profile</button>
              </li>
              <li class="font-semibold text-xl mb-1">
                <button>Setting</button>
              </li>
              <li class="font-semibold text-xl mb-1">
                <button>Inbox</button>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Admin;
