import {
    createIcons,
    LayoutDashboard,
    Package,
    Pencil,
    Plus,
    Receipt,
    Search,
    ShoppingCart,
    Trash2,
    User,
    Users,
    X,
    Eye,
    LogOut,
    EllipsisVertical,
} from "lucide";

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

createIcons({
    icons: {
        LayoutDashboard,
        Package,
        Pencil,
        Plus,
        Receipt,
        Search,
        ShoppingCart,
        Trash2,
        User,
        Users,
        X,
        Eye,
        LogOut,
        EllipsisVertical,
    },
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});
