import React from 'react'

export default function  AjouterGestionnaire({ open, handleClose, onGestionnairedded }) {
 const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Le nom est requis.";
        if (!form.email) newErrors.email = "L'email est requis.";
        if (!form.password) newErrors.password = "Le mot de passe est requis.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setForm({ name: "", email: "", password: "" });
        setErrors({});
        setShowPassword(false);
    };
    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);
            const res = await apiClient.post("/admin/AjouterGestionnaire", form);

            if (res.status === 400) {
                toast.error(res?.data?.message);
            } else {

                toast.success("Gestionnaire ajouté avec succès !");
                
                onGestionnairedded(); // Pour rafraîchir la liste
                setTimeout(() => {
                    handleClose();       
                    resetForm();        
                }, 1000);
            }



        } catch (err) {

            toast.error("Erreur lors de l'ajout.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return (
        <Dialog open={open} handler={() => {
            resetForm();
            handleClose();
        }}>
            <ToastContainer position='top-center' />
            <DialogHeader>Ajouter un Gestionnaire</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <div>
                    <Input
                        label="Nom"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <Input
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="relative">
                    <Input
                        label="Mot de passe"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                    />
                    <div
                        className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                        )}
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" onClick={() => {
                    resetForm();
                    handleClose();
                }} className="mr-2">
                    Annuler
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Ajout..." : "Ajouter"}
                </Button>

            </DialogFooter>
        </Dialog>
    );
}

