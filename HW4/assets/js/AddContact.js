document.querySelector('#contactList').style.visibility='hidden';
document.querySelector('#displaycontact').addEventListener('click',DisplayContact);

function DisplayContact(e){
    // console.log(e.target.value);
    if(document.querySelector('#displaycontact').value =='Display Contactlist'){
        document.querySelector('#displaycontact').value = 'Hide Contactlist'
        document.querySelector('#contactList').style.visibility='';
        UI.displayContacts;
    }else{
        document.querySelector('#displaycontact').value = 'Display Contactlist';
        document.querySelector('#contactList').style.visibility='hidden';

    }
}

/////////////////////////////////////////////////////////////////////////////////////////

// 1. Contact Class: Represents a Contact
class contact {
    constructor(subject, name, phone, email,gender,msg) {
      this.subject = subject;
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.gender = gender;
      this.msg =msg;
      
    }
  }
  
  // 2. UI Class: Handle UI Tasks
  class UI {
    static displayContacts() {
       
      const contacts = Store.getContacts();
  
      contacts.forEach((contact) => UI.addContactToList(contact));
    }
  
  // 4. add book
    static addContactToList(contactA) {
      const list = document.querySelector('#contactList');
  
      const row = document.createElement('tr');

      row.innerHTML = `
      <td align="center">
        <h3>${contactA.subject}</h3> 
        <h4>from ${contactA.name} (${contactA.gender})</h4>
        <div>E-MA
        IL : ${contactA.email}  - PHONE : ${contactA.phone} </div>
        <div>MESSAGE : ${contactA.msg}</div>
        <div><input type="submit" href="#contact" class="btn btn-danger btn-sm delete" value="Delete contact">  </input></div>
      </td>

      `;
  
      list.appendChild(row);
    }
  
  // 11. delete book  
    static deleteContact(el) {
      // if element contains .delete class
      if(el.classList.contains('delete')) {
      // remove <a> -> <td> -> <tr>       
        el.parentElement.parentElement.remove();
      }
    }
  
  // 9. clear fields  
    static clearFields() {
      document.querySelector('#subject').value = '';
      document.querySelector('#name').value = '';
      document.querySelector('#phone').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#message').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getContacts() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
  
    static addContact(contactA) {
      const contacts = Store.getContacts();
      contacts.push(contactA);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(name) {
      const contacts = Store.getContacts();
  
      contacts.forEach((contact, index) => {
        if(name.contains(contact.name)) {
          contacts.splice(index, 1);
        }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  
  // 4. Event: Display Contacts
  //document.addEventListener('DOMContentLoaded', UI.displayContacts);
  
  // 5. Event: Add a Contact
  document.querySelector('#submitcontact').addEventListener('click', (e) => {
    // 7. Prevent actual submit action

    e.preventDefault();
    //console.log("OK");
    
    // Get form values
     const name = document.querySelector('#name').value;
     const phone =document.querySelector('#phone').value;
     const email =document.querySelector('#email').value;
     const subject = document.querySelector('#subject').value;
     let gendy;
     if(document.querySelector('#toggle-on').checked){
        gendy ='MALE';
     }else{
        gendy ='FEMALE';
     }
     const gender =gendy;
     const msg =document.querySelector('#message').value;

    // 12. Validate
    if(name === '' || email ==='' || phone ==='' ) {
      //UI.showAlert('Please fill in all fields', 'danger');
      alert('Please fill in all fields');
    } else {
      // 6. Instatiate contact
      const contactA = new contact(subject, name, phone, email,gender,msg);
      // console.log(contact);
  
      // 8. Add Contact to UI
      UI.addContactToList(contactA);
  
      // Add contact to list
      Store.addContact(contactA);
  
      // 9. Clear fields
      UI.clearFields();
    }
  });
  
  // 10. Event: Remove a contact - event propagation by selecting the parent
  document.querySelector('#contactList').addEventListener('click', (e) => {
     console.log(e.target);
    console.log(e.target.parentElement.previousElementSibling.textContent);
    // 11. Remove contact from UI
    UI.deleteContact(e.target);
  
    // Remove contact from list
    //Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  
  });

  /////////////////////////////////////////////////////////////////////////////////////////////


