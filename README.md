# **Transport Facility Management**

## **Overview**

Transport Facility Management is a simple Angular web application that allows employees to **add, view, and book rides** provided by other employees. The system ensures rides are **only for the current day**, with a **time window of ±60 minutes** for booking.

This application was developed as a **front-end assignment** and uses **MockAPI.io** as a cloud backend for storing rides. The front-end is deployed on **Netlify**.

---

## **Features**

* **Dashboard** with two main options:

  * **Add Ride** – create a new ride.
  * **Pick Ride** – view and book available rides.

* **Add Ride Form**

  * Employee ID (unique, required)
  * Vehicle Type (Bike/Car)
  * Vehicle No (required)
  * Vacant Seats (required)
  * Time (today only, future time)
  * Pickup Point (required)
  * Destination (required)

* **Ride List / Booking**

  * Only rides **for today** are shown.
  * Only rides within **±60 minutes** of current time are shown.
  * **Vehicle type filter** (Bike/Car).
  * Cannot book your own ride.
  * Vacant seats are updated on booking.
  * Cannot book the same ride twice.

* **Header**

  * Company name **Infrrd**
  * Clickable → always routes to home/dashboard.

* **Responsive UI**

  * Horizontal cards on desktop
  * Stacks vertically on mobile
  * Empty state template when no rides are available

---

## **Technologies Used**

* **Front-end:** Angular 15+
* **Forms:** Reactive Forms + Form Validation
* **HTTP:** HttpClient
* **Mock Backend:** [MockAPI.io](https://mockapi.io/)
* **Deployment:** [Netlify](https://www.netlify.com/)
* **Styling:** SCSS, Flexbox for responsive design

---

## **Project Structure**

```
src/
├─ app/
│  ├─ components/
│  │  ├─ header/          # Header component
│  │  ├─ add-ride/        # Add Ride form component
│  │  ├─ ride-list/       # Ride List / booking component
│  │  └─ dashboard/       # Landing page with Add/Pick buttons
│  ├─ services/
│  │  └─ ride.service.ts  # API service to connect with MockAPI
│  └─ app-routing.module.ts
├─ assets/
│  └─ no-rides.png        # Empty state illustration
```

---

## **Installation / Run Locally**

1. Clone the repository:

```bash
git clone <repo-url>
cd transport-facility
```

2. Install dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
ng serve
```

4. Open `http://localhost:4200` in your browser.

> Note: Ensure `ride.service.ts` points to the **MockAPI.io endpoint** for live CRUD operations.

---

## **Deployment**

The app is deployed on **Netlify**.

* **Live URL:** [[text](https://transport-facility-infrrd.netlify.app/home)](https://transport-facility-infrrd.netlify.app/home)

Steps for deployment:

1. Build Angular for production:

```bash
ng build --prod
```

2. Drag & drop `dist/<project-name>/` into Netlify’s deploy section.
3. Ensure `_redirects` file exists (for Angular routing):

```
/* /index.html 200
```

---

## **Usage**

1. **Dashboard** → choose **Add Ride** or **Pick Ride**.
2. **Add Ride** → fill the form with your ride details → submit.
3. **Pick Ride** → see available rides filtered by **vehicle type** and **time window**.
4. **Book Ride** → enter your Employee ID → click **Book** → vacant seats update.
5. **Header** → click **Infrrd** to return to the dashboard at any time.

---

## **Time Validation & Logic**

* Rides can only be **added for today** and **from current time onwards**.
* Booking only shows rides **within ±60 minutes** of current time.
* Employees cannot book their own rides or book the same ride twice.
* Time is stored as a **full Date string** to simplify comparisons.

---

## **Credits**

* Developed by: **Rohit Savalagi**
* Front-end assignment using Angular 15+
* Mock backend powered by **MockAPI.io**
* Deployed using **Netlify**
