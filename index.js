let result;
let pageNum = 1;
let repoPerPage = 10;

// get userData from backend
async function userData(name, page, perPage) {
  const per_page = perPage ? perPage : 10;
  const repoPage = page ? page : 1;
  return await fetch(
    `http://localhost:3000/${name}/${per_page}/${repoPage}`
  ).then((data) => {
    return data.json();
  });
}
// get total no of public repo for an user
async function noOfPublicRepo(user) {
  return await fetch(`https://api.github.com/users/${user}`)
    .then((data) => {
      console.log("before json", data);
      return data.json();
    })
    .then((userInfo) => {
      console.log(userInfo);
      return userInfo.public_repos;
    });
}

function pageUpDate() {
  const secondPage = document.getElementById("secondPage");
  secondPage.style.cssText = `display:inherit`;
  const warning = document.getElementById("warning");
  warning.style.cssText = `display:none`;
}

// generate page as per user
const userSearch = document.getElementById("userSearch");
userSearch.addEventListener("click", async () => {
  const userName = document.getElementById("user").value;
  if (!userName) {
    alert("Enter valid username");
    return;
  }
  const img = document.createElement("img");
  img.src = "./images/Spinner.gif";
  document.body.appendChild(img);
  img.style.cssText = `margin-left: 40%`;
  console.log(userName);
  try {
    userData(userName, 1, 10).then((result) => {
      if (result.message || result.length == 0) {
        alert(result.message || "User Not found");
        document.body.removeChild(img);
        return;
      } else {
        const user_name = document.getElementById("userName");
        user_name.innerText = result[0].owner.login;

        const profileImage = document.getElementById("profileImage");
        profileImage.src = result[0].owner.avatar_url;

        const gitLink = document.getElementById("gitLink");
        gitLink.href = result[0].owner.html_url;
        gitLink.innerText = result[0].owner.html_url;

        pageUpDate();
        repoGenerator(userName, 1, 10);
        pageButtonGenerator();
      }
      document.body.removeChild(img);
    }).catch((error) => {
        document.body.removeChild(img);
        alert(error);
      });;
  } catch (error) {
    alert("Please fill correct username ");
  }
});

// repository detail fill in each div
async function repoGenerator(userName, pageNo, itemPerPage) {
  result = await userData(userName, pageNo, itemPerPage);

  const repo_container = document.getElementById("repo_container");
  repo_container.innerHTML = "";

  const promises = [];
  const cards = [];
  for (let i = 0; i < result.length; i++) {
    promises.push(fetch(result[i].languages_url));
    const repoName = result[i].full_name.split("/")[1];
    const repoDesc = result[i].description;
    const repoContent = document.createElement("div");
    repoContent.innerHTML = `<div class="repo">
    <span class="repo_name">${repoName}</span>
    <p>${repoDesc ? repoDesc : "Nothing"}</p>
    <div class="topics">
    </div>
    </div>
  `;
    cards.push(repoContent);
    repo_container.appendChild(repoContent);
  }

  Promise.all(promises).then((values) => {
    Promise.all(values.map((val) => val.json())).then((data) => {
      for (let i = 0; i < cards.length; i++) {
        const topic = cards[i].getElementsByClassName("topics")[0];
        for (let obj in data[i]) {
          const topicWrapper = document.createElement("div");
          topicWrapper.className = "topic";
          topicWrapper.innerHTML = `<span class="tech"> ${obj}</span>`;
          topic.appendChild(topicWrapper);
        }
      }
    });
  });
}

// pagination section
function pageButtonGenerator() {
  const userName = document.getElementById("user").value;
  noOfPublicRepo(userName).then((totalRepo) => {
    const page_no = document.getElementById("page_no");
    const itemPerPage = document.getElementById("itemPerPage").value;
    const numOfButton = Math.ceil(totalRepo / itemPerPage);
    page_no.style.cssText = `display: flex;
justify-content: space-around;
width: 300px`;
    // create desire no. of button
    for (let i = 1; i <= numOfButton; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;
      pageButton.addEventListener("click", () => {
        const itemPerPage = document.getElementById("itemPerPage").value;
        pageNum = pageButton.textContent;
        repoGenerator(userName, pageNum, itemPerPage);
        console.log(itemPerPage, pageButton.textContent);
      });
      page_no.appendChild(pageButton);
    }
  });
}

// navigation section
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
nextButton.addEventListener("click", () => {
  const itemPerPage = document.getElementById("itemPerPage").value;
  const userName = document.getElementById("user").value;
  repoGenerator(userName, pageNum + 1, itemPerPage);
});
prevButton.addEventListener("click", () => {
  const itemPerPage = document.getElementById("itemPerPage").value;
  const userName = document.getElementById("user").value;
  repoGenerator(userName, pageNum - 1, itemPerPage);
});

const itemPerPage = document.getElementById("itemPerPage");
itemPerPage.addEventListener("change", (e) => {
  const userName = document.getElementById("user").value;
  repoGenerator(userName, pageNum, e.target.value);
  const page_no = document.getElementById("page_no");
  page_no.innerHTML = "";
  pageButtonGenerator();
});

// repo filter section/ search repo
const repoSearch = document.getElementById("repoSearch");
repoSearch.addEventListener("input", (e) => {
  const input = e.target.value;
  const promises = [];
  const cards = [];
  repo_container.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    const repoName = result[i].full_name.split("/")[1];
    if (!repoName.includes(input)) continue;
    promises.push(fetch(result[i].languages_url));
    const repoDesc = result[i].description;
    const repoContent = document.createElement("div");
    repoContent.innerHTML = `<div class="repo">
        <span class="repo_name">${repoName}</span>
        <p>${repoDesc ? repoDesc : "Nothing"}</p>
        <div class="topics">
        </div>
        </div>
      `;
    cards.push(repoContent);
    repo_container.appendChild(repoContent);
  }
  Promise.all(promises).then((values) => {
    Promise.all(values.map((val) => val.json())).then((data) => {
      for (let i = 0; i < cards.length; i++) {
        const topic = cards[i].getElementsByClassName("topics")[0];
        for (let obj in data[i]) {
          const topicWrapper = document.createElement("div");
          topicWrapper.className = "topic";
          topicWrapper.innerHTML = `<span class="tech"> ${obj}</span>`;
          topic.appendChild(topicWrapper);
        }
      }
    });
  });
});
