import modeldata from './modelData.js';

let displayCount = 3;
function updateGrid() {
  document.querySelector('.grid-boxes').innerHTML = modeldata
    .map(
      (data, index) => {
        // Identify if project is Redux, Ruby, or Ruby on Rails
        const isReduxRuby =
          (data.technologies && data.technologies.some(tech =>
            tech.toLowerCase().includes('redux') ||
            tech.toLowerCase().includes('ruby') ||
            tech.toLowerCase().includes('rails')
          )) ||
          (data.field && (
            data.field.toLowerCase().includes('redux') ||
            data.field.toLowerCase().includes('ruby') ||
            data.field.toLowerCase().includes('rails')
          ));
        return `
    <div class="box-container ${index >= displayCount ? 'hidden' : ''}">
          <div id="box-${index}" class="box box1">
            <div class="imgBx">
              <img src="${data.image}" alt="${data.projectname}" loading="lazy" />
              <h2>${data.projectname}</h2>
              <div class="project-content">
                <h3>${data.field}</h3>
                <p>
                  ${data.description}
                </p>
                ${!isReduxRuby ? `<div class="project-technologies">
              ${data.technologies
    .map((tech) => `<a href="#"><i class='${tech}' ></i></a>`)
    .join('')}
            </div>` : ''}
              <div class="content-footer">
                <a href="${data.sourcelink}" target="_blank" class="source"><i class='bx bxl-github'></i>Source</a>
                <a href="${data.livelink}" target="_blank" class="live-link"><i class='bx bx-low-vision' ></i>Live</a>
              </div>
              </div>
            </div>
          </div>
        </div>
`;
      }
    )
    .join('');
}

const seeAll = document.querySelector('.more-btn');

function adjustDisplayCount() {
  if (window.innerWidth >= 623 && window.innerWidth < 1300) {
    displayCount = 4;
  } else if (window.innerWidth >= 1300) {
    displayCount = 6;
  } else {
    displayCount = 3;
  }
  updateGrid();
}

adjustDisplayCount();

seeAll.addEventListener('click', (e) => {
  e.preventDefault();
  if (displayCount === modeldata.length) {
    adjustDisplayCount();
    seeAll.textContent = 'See All';
  } else {
    displayCount = modeldata.length;
    updateGrid();
    seeAll.textContent = 'See Less';
  }
});

const MOBILE_WIDTH_THRESHOLD = 623;
const TABLET_WIDTH_THRESHOLD = 1300;
let counter = 1;

function handleResize() {
  if (window.innerWidth < MOBILE_WIDTH_THRESHOLD && counter !== 1) {
    counter = 1;
    adjustDisplayCount();
  } else if (
    window.innerWidth >= MOBILE_WIDTH_THRESHOLD
      && window.innerWidth < TABLET_WIDTH_THRESHOLD
      && counter !== 2
  ) {
    counter = 2;
    adjustDisplayCount();
  } else if (window.innerWidth >= TABLET_WIDTH_THRESHOLD && counter !== 3) {
    counter = 3;
    adjustDisplayCount();
  }
}

// Attach the event listener
window.addEventListener('resize', handleResize);
