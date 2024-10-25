// # Fichier pour les animations et interactions
document.addEventListener("DOMContentLoaded", function() {
    // ----------------- Animations Scroll -----------------
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", function() {
      sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
  
        if (sectionPosition < screenPosition) {
          section.classList.add("visible");
        }
      });
    });
  
    // ----------------- Validation Email -----------------
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // ----------------- Formulaires de Connexion et Inscription -----------------
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');
    const editProfileForm = document.querySelector('#editProfileForm');
  
    if (loginForm) {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
  
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let valid = true;
  
        if (!validateEmail(email)) {
          alert('Veuillez entrer une adresse e-mail valide.');
          valid = false;
        }
  
        if (password.length < 6) {
          alert('Le mot de passe doit comporter au moins 6 caractères.');
          valid = false;
        }
  
        if (valid) {
          localStorage.setItem("isLoggedIn", "true");
          alert('Connexion réussie !');
          window.location.href = '/pages/dashboard.html'; // Redirection
        }
      });
    }
  
    if (signupForm) {
      const fullNameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirmPassword');
  
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        let valid = true;
  
        if (fullName.length < 3) {
          alert('Le nom complet doit comporter au moins 3 caractères.');
          valid = false;
        }
  
        if (!validateEmail(email)) {
          alert('Veuillez entrer une adresse e-mail valide.');
          valid = false;
        }
  
        if (password.length < 6) {
          alert('Le mot de passe doit comporter au moins 6 caractères.');
          valid = false;
        }
  
        if (password !== confirmPassword) {
          alert('Les mots de passe ne correspondent pas.');
          valid = false;
        }
  
        if (valid) {
          alert('Inscription réussie !');
          // signupForm.submit(); // Décommentez pour une soumission réelle
        }
      });
    }
  
    if (editProfileForm) {
      const fullNameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
  
      editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        let valid = true;
  
        if (fullName.length < 3) {
          alert('Le nom complet doit comporter au moins 3 caractères.');
          valid = false;
        }
  
        if (!validateEmail(email)) {
          alert('Veuillez entrer une adresse e-mail valide.');
          valid = false;
        }
  
        if (valid) {
          alert('Profil mis à jour avec succès !');
          // editProfileForm.submit(); // Décommentez pour une soumission réelle
        }
      });
    }
  
    // ----------------- Gestion des Villes (CRUD) -----------------
    const addCityForm = document.getElementById('addCityForm');
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    const citiesContainer = document.getElementById('citiesContainer');
  
    // Fonction pour ajouter une ville
    if (addCityForm) {
      addCityForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const cityName = document.getElementById('cityName').value.trim();
        const cityDescription = document.getElementById('cityDescription').value.trim();
        const cityPlaces = document.getElementById('cityPlaces').value.trim().split(',');
  
        const newCity = {
          name: cityName,
          description: cityDescription,
          places: cityPlaces.map(place => place.trim())
        };
  
        cities.push(newCity);
        localStorage.setItem("cities", JSON.stringify(cities));
  
        alert('Ville ajoutée avec succès !');
        window.location.href = '/pages/view-cities.html'; // Redirection
      });
    }
  
    // Fonction pour afficher les villes
    if (citiesContainer) {
      if (cities.length === 0) {
        citiesContainer.innerHTML = "<p>Aucune ville n'est disponible pour l'instant.</p>";
      } else {
        cities.forEach((city, index) => {
          const cityCard = `
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${city.name}</h5>
                <p class="card-text">${city.description}</p>
                <p><strong>Lieux emblématiques :</strong> ${city.places.join(', ')}</p>
                <button class="btn btn-warning btn-sm me-2" onclick="editCity(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCity(${index})">Supprimer</button>
              </div>
            </div>
          `;
          citiesContainer.innerHTML += cityCard;
        });
      }
    }
  
    // Fonction pour supprimer une ville
    window.deleteCity = function(index) {
      cities.splice(index, 1);
      localStorage.setItem("cities", JSON.stringify(cities));
      window.location.reload(); // Recharge la page pour mettre à jour la liste
    }
  
    // Fonction pour modifier une ville
    window.editCity = function(index) {
      const city = cities[index];
      const newCityName = prompt("Modifier le nom de la ville", city.name);
      const newCityDescription = prompt("Modifier la description", city.description);
      const newCityPlaces = prompt("Modifier les lieux emblématiques (séparés par des virgules)", city.places.join(','));
  
      if (newCityName && newCityDescription && newCityPlaces) {
        cities[index] = {
          name: newCityName.trim(),
          description: newCityDescription.trim(),
          places: newCityPlaces.split(',').map(place => place.trim())
        };
        localStorage.setItem("cities", JSON.stringify(cities));
        window.location.reload();
      }
    }
  
    // ----------------- Gestion de la Connexion / Déconnexion -----------------
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (!isLoggedIn && window.location.pathname === '/pages/dashboard.html') {
      alert("Vous devez être connecté pour accéder au tableau de bord.");
      window.location.href = '/pages/login.html';
    }
  
    const logoutButton = document.querySelector('#logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', function() {
        localStorage.removeItem("isLoggedIn");
        alert("Déconnecté avec succès.");
        window.location.href = '/pages/login.html';
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const btnToTop = document.getElementById("btn-to-top");
  
    // Quand l'utilisateur fait défiler 100px, afficher le bouton
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnToTop.style.display = "block";
      } else {
        btnToTop.style.display = "none";
      }
    };
  
    // Scroll vers le haut lorsque le bouton est cliqué
    btnToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
  