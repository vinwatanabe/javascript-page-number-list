const contacts = users.results;

const pageHeader = document.querySelector('.page-header');
const htmlContactNum = pageHeader.querySelector('h3');
htmlContactNum.innerHTML = `Total: ${contacts.length}`;

const htmlContactList = document.querySelector('.contact-list');
const htmlPagination = document.querySelector('.page-list');

// Create html elements and insert contacts
const createContact = (picture, fullName, email, joinedDate, pageNum) => {
	const contactLi = document.createElement('li');
	contactLi.className = `contact-item cf ${pageNum}`;

	const contactDiv = document.createElement('div');
	contactDiv.className = 'contact-details';

	const contactImg = document.createElement('img');
	contactImg.className = 'avatar';
	contactImg.src = picture;
	contactDiv.appendChild(contactImg);

	const contactH3 = document.createElement('h3');
	contactH3.textContent = `${fullName}`;
	contactDiv.appendChild(contactH3);

	const contactSpan = document.createElement('span');
	contactSpan.className = 'email';
	contactSpan.textContent = `${email}`;
	contactDiv.appendChild(contactSpan);

	contactLi.appendChild(contactDiv);

	const contactDivDetails = document.createElement('div');
	contactDivDetails.className = 'joined-details';

	const contactSpanDate = document.createElement('span');
	contactSpanDate.className = 'date';

	const date = new Date(joinedDate);
	const formatedDate = `${
		date.getMonth() + 1
	}/${date.getDate()}/${date.getFullYear()}`;

	contactSpanDate.textContent = `Joined ${formatedDate}`;
	contactDivDetails.appendChild(contactSpanDate);

	contactLi.appendChild(contactDivDetails);

	htmlContactList.appendChild(contactLi);
};

//create page number for li reference in CSS
let pageNum = 0;

for (let i = 0; i < contacts.length; i++) {
	//Create pagination elements
	if (i % 10 === 0) {
		pageNum++;

		const pagLi = document.createElement('li');
		const pagA = document.createElement('a');
		pagA.textContent = pageNum;
		pagLi.appendChild(pagA);

		//Add event listener to every contact to respond to a click event
		pagLi.addEventListener('click', () => {
			const selectedPageNum = pagA.innerHTML;

			const fullList = document.querySelectorAll('.contact-item');

			fullList.forEach((item) => {
				item.style.display = 'none';

				if (`contact-item cf ${selectedPageNum}` === item.className) {
					item.style.display = '';
				}
			});
		});

		htmlPagination.appendChild(pagLi);
	}

	const userPicture = contacts[i].picture.thumbnail;
	const userFullName = `${contacts[i].name.first} ${contacts[i].name.last}`;
	const userEmail = `${contacts[i].email}`;
	const userJoinedDate = contacts[i].registered.date;

	createContact(userPicture, userFullName, userEmail, userJoinedDate, pageNum);
}

const allContacts = document.querySelectorAll('.contact-item');
if (allContacts.length > 0) {
	allContacts.forEach((item) => {
		item.style.display = 'none';

		if (item.className === `contact-item cf 1`) {
			item.style.display = '';
		}
	});
}
