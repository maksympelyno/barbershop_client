# Barbershop Management 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.


## Video of the application and its functionality
https://github.com/user-attachments/assets/1a111c22-47ab-421d-9066-fb3cb8c0cf05

## Implemented Functionality  

### Authentication & Authorization  
- JWT-based authentication.  
- Two user roles: **Manager** and **Admin**.  

### Manager Capabilities  
- Assigned to a specific branch.  
- Can view haircuts, edit their price and name, and add new haircuts.  
- Can view clients and add new clients.  
- Can view completed visits sorted by date, including client details, haircut details, and visit date.  
- Can add new visits by selecting a client and haircuts from a searchable dropdown.  

### Admin Capabilities  
- Access to the **Statistics** section.  
- Can analyze statistics for a specific branch, including client count, revenue, and related metrics.  
- Can view the price change history for each haircut.  

### Responsive Design  
- Fully responsive UI, optimized for smartphones and tablets.  
- Implemented using **Tailwind CSS** for adaptive layouts and smooth user experience.

  
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/maksympelyno/barbershop_client
   ```
2. Install dependencies:
   ```bash
   npm install
3. Run:
   ```bash
   ng serve

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
