import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `
        <div class="container">
            <h1>Angular Refresh Confirmation Demo</h1>
            <p class="description">This demo shows how to prevent data loss when refreshing the page.</p>
            
            <div class="demo-section">
                <h2>Sample Form Data</h2>
                <p class="info">Enter some data below, then try to refresh the page or close the tab.</p>
                
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input 
                        id="username"
                        type="text" 
                        [(ngModel)]="formData.username" 
                        (input)="onDataChange()"
                        placeholder="Enter your username"
                        class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input 
                        id="email"
                        type="email" 
                        [(ngModel)]="formData.email" 
                        (input)="onDataChange()"
                        placeholder="Enter your email"
                        class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea 
                        id="message"
                        [(ngModel)]="formData.message" 
                        (input)="onDataChange()"
                        placeholder="Enter your message"
                        class="form-control"
                        rows="4"></textarea>
                </div>
                
                <div class="button-group">
                    <button (click)="saveData()" class="btn btn-primary">Save Data</button>
                    <button (click)="clearData()" class="btn btn-secondary">Clear Data</button>
                    <button (click)="toggleConfirmation()" class="btn" [class.btn-danger]="hasUnsavedChanges" [class.btn-success]="!hasUnsavedChanges">
                        {{ hasUnsavedChanges ? 'Disable' : 'Enable' }} Refresh Confirmation
                    </button>
                </div>
                
                <div class="status" [class.unsaved]="hasUnsavedChanges" [class.saved]="!hasUnsavedChanges">
                    Status: {{ hasUnsavedChanges ? 'Unsaved Changes' : 'All Saved' }}
                </div>
            </div>
            
            <div class="instructions">
                <h3>How to Test:</h3>
                <ol>
                    <li>Enter some text in the form fields above</li>
                    <li>Try to refresh the page (Ctrl+R or F5)</li>
                    <li>You'll see a confirmation dialog: "Data will be loss are you sure to loss?"</li>
                    <li>Click "Save Data" to mark data as saved (no confirmation will appear)</li>
                    <li>Use the toggle button to enable/disable the confirmation feature</li>
                </ol>
            </div>
            
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .description {
            color: #7f8c8d;
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        
        .demo-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid #e9ecef;
        }
        
        h2 {
            color: #495057;
            margin-bottom: 15px;
        }
        
        .info {
            color: #6c757d;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #495057;
        }
        
        .form-control {
            width: 100%;
            padding: 10px;
            border: 2px solid #ced4da;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.15s ease-in-out;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.15s ease-in-out;
        }
        
        .btn-primary {
            background-color: #007bff;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #0056b3;
        }
        
        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background-color: #545b62;
        }
        
        .btn-danger {
            background-color: #dc3545;
            color: white;
        }
        
        .btn-danger:hover {
            background-color: #c82333;
        }
        
        .btn-success {
            background-color: #28a745;
            color: white;
        }
        
        .btn-success:hover {
            background-color: #218838;
        }
        
        .status {
            padding: 10px;
            border-radius: 4px;
            font-weight: 600;
            text-align: center;
        }
        
        .status.unsaved {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .status.saved {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .instructions {
            background: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #ffeaa7;
        }
        
        .instructions h3 {
            color: #856404;
            margin-bottom: 15px;
        }
        
        .instructions ol {
            color: #856404;
            margin-left: 20px;
        }
        
        .instructions li {
            margin-bottom: 5px;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
            }
        }
    `]
})
export class AppComponent implements OnInit, OnDestroy {
    hasUnsavedChanges = false;
    
    formData = {
        username: '',
        email: '',
        message: ''
    };

    ngOnInit() {
        console.log('App component initialized with refresh confirmation');
    }

    ngOnDestroy() {
        // Cleanup if needed
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event: BeforeUnloadEvent) {
        if (this.hasUnsavedChanges) {
            // Modern browsers will show their own generic message
            // but we can still prevent the default behavior
            event.preventDefault();
            
            // Set the return value for older browsers
            const message = 'Data will be loss are you sure to loss?';
            event.returnValue = message;
            
            // Return the message for compatibility
            return message;
        }
        return null;
    }

    onDataChange() {
        this.hasUnsavedChanges = true;
        console.log('Data changed - unsaved changes detected');
    }

    saveData() {
        this.hasUnsavedChanges = false;
        console.log('Data saved:', this.formData);
        alert('Data saved successfully! You can now refresh without confirmation.');
    }

    clearData() {
        this.formData = {
            username: '',
            email: '',
            message: ''
        };
        this.hasUnsavedChanges = false;
        console.log('Data cleared');
    }

    toggleConfirmation() {
        this.hasUnsavedChanges = !this.hasUnsavedChanges;
        console.log('Refresh confirmation:', this.hasUnsavedChanges ? 'Enabled' : 'Disabled');
    }
}
