const taskContiner = document.querySelector(".task_container");
let globalTaskData = []; 
   
const addNewCard = () => { 
  const myCard = {
    id: `${Date.now()}`, //  it always gives the unique value    

      
    image: document.getElementById("imgurl").value, 
    TaskTitle: document.getElementById("taskTitle").value,
    TaskType: document.getElementById("taskType").value,
    TaskDesc: document.getElementById("taskDesc").value,
  }; 

  globalTaskData.push(myCard);

  localStorage.setItem("Tasky", JSON.stringify({ cards: globalTaskData }));

  const cardInfo = ` <div class="col-md-6 col-lg-4 mt-3 mb-3" id=${myCard.id}>
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
      <button class="btn btn-outline-info">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button class="btn btn-outline-danger" name=${myCard.id} onclick="deleteCard.apply(this,arguments)">
        <i class="fas fa-trash" name=${myCard.id}></i>
      </button>
    </div>
    <div class="card-body">
      <img
        src=${myCard.image}
        alt="img"
        class="card-img" 
      />
      <h5 class="card-title mt-3" >${myCard.TaskTitle}</h5>
      <p class="card-text" >
        ${myCard.TaskDesc}
      </p>
      <span class="badge bg-primary" >${myCard.TaskType}</span>
    </div>
    <div class="card-footer text-muted">
      <button class="btn btn-outline-primary" >Open Task</button>
    </div>
  </div>
</div>`;

  taskContiner.insertAdjacentHTML("beforeend", cardInfo);
  // taskContiner.innerHTML = cardInfo;

  document.getElementById("imgurl").value = "";
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDesc").value = "";

  return;
};

const LoadExistingCard = () => {
  const getData = localStorage.getItem("Tasky");

  if (!getData) return;

  const TaskCards = JSON.parse(getData);
  globalTaskData = TaskCards.cards;

  
  
  globalTaskData.map((myCard) => {
    // map copies the array
    const cardInfo = ` <div class="col-md-6 col-lg-4 mt-3 mb-3" id=${myCard.id}>
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button class="btn btn-outline-info">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-outline-danger" name=${myCard.id} onclick="deleteCard.apply(this,arguments)">
          <i class="fas fa-trash" name=${myCard.id} ></i>
        </button>
      </div>
      <div class="card-body">
        <img
          src=${myCard.image}
          alt="img"
          class="card-img" 
        />
        <h5 class="card-title mt-3" >${myCard.TaskTitle}</h5>
        <p class="card-text" >
          ${myCard.TaskDesc}
        </p>
        <span class="badge bg-primary" >${myCard.TaskType}</span>
      </div>
      <div class="card-footer text-muted">
        <button class="btn btn-outline-primary" >Open Task</button>
      </div>
    </div>
  </div>`;

    taskContiner.insertAdjacentHTML("beforeend", cardInfo);
  });
  return;
};

// delete card function

const deleteCard = (event) => {
  const TargetID = event.target.getAttribute("name");
  const tagNameClicked = event.target.tagName;

  const removeTask = globalTaskData.filter((task) => task.id !== TargetID);
  globalTaskData = removeTask;

  localStorage.setItem("Tasky", JSON.stringify({ cards: globalTaskData }));

  if (tagNameClicked === "BUTTON") {
    return taskContiner.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContiner.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};
