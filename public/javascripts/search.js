function search() {
    var q = document.getElementById('searchInput').value;
    if (q.length > 0) {
        window.location.href="/search?q="+q;
    } else {
        window.location.href="/search";
    }
}