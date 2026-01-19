// API Service - Manejo de peticiones HTTP
const API_BASE = '/api';

const api = {
    async request(endpoint, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            credentials: 'include',
            ...options
        };

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en la petición');
            }

            return data;
        } catch (error) {
            console.error('Error en API:', error);
            throw error;
        }
    },

    // Autenticación
    auth: {
        login: (email, password) => 
            api.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            }),
        logout: () => 
            api.request('/auth/logout', { method: 'POST' }),
        verify: () => 
            api.request('/auth/verify')
    },

    // Usuarios
    usuarios: {
        getAll: () => api.request('/usuarios'),
        getById: (id) => api.request(`/usuarios/${id}`),
        create: (data) => api.request('/usuarios', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id, data) => api.request(`/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id) => api.request(`/usuarios/${id}`, { method: 'DELETE' })
    },

    // Trabajadores
    trabajadores: {
        getAll: () => api.request('/trabajadores'),
        getActivos: () => api.request('/trabajadores/activos'),
        getById: (id) => api.request(`/trabajadores/${id}`),
        create: (data) => api.request('/trabajadores', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id, data) => api.request(`/trabajadores/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id) => api.request(`/trabajadores/${id}`, { method: 'DELETE' })
    },

    // Asistencia
    asistencia: {
        getAll: () => api.request('/asistencia'),
        getByPeriodo: (id) => api.request(`/asistencia/periodo/${id}`),
        getByTrabajador: (id) => api.request(`/asistencia/trabajador/${id}`),
        create: (data) => api.request('/asistencia', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        getTipos: () => api.request('/asistencia/tipos'),
        getPeriodoActual: () => api.request('/asistencia/periodo-actual')
    }
};

// Utilidades
const utils = {
    showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.content') || document.body;
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => alertDiv.remove(), 5000);
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('es-CL');
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(amount);
    },

    validateRUT(rut) {
        rut = rut.replace(/[^0-9kK]/g, '');
        if (rut.length < 2) return false;
        
        const body = rut.slice(0, -1);
        const dv = rut.slice(-1).toUpperCase();
        
        let sum = 0;
        let multiplier = 2;
        
        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
        
        const dvExpected = 11 - (sum % 11);
        const dvFinal = dvExpected === 11 ? '0' : dvExpected === 10 ? 'K' : dvExpected.toString();
        
        return dv === dvFinal;
    },

    formatRUT(rut) {
        rut = rut.replace(/[^0-9kK]/g, '');
        if (rut.length < 2) return rut;
        
        const body = rut.slice(0, -1);
        const dv = rut.slice(-1);
        
        return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
    }
};
