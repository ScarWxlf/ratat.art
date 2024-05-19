<script>
    import {page} from '$app/stores';
</script>

<div class="flex gap-20 w-full">
    <div class="flex flex-col w-2/12 items-center">
        <ul class="flex flex-col text-2xl gap-3">
            <li>
                <a href="/profile_settings">Profile settings</a>
                <div class="h-1 mt-0.5 w-full bg-black dark:bg-white {$page.route.id === '/profile_settings' ? "" : 'collapse'}"></div>
            </li>
            <li>
                <a href="/profile_settings/personal">Personal settings</a>
                <div class="h-1 mt-0.5 w-full bg-black dark:bg-white {$page.route.id === '/profile_settings/personal' ? "" : 'collapse'}"></div>
            </li>
            <li>
                <a href="/profile_settings/filters">Filters settings</a>
                <div class="h-1 mt-0.5 w-full bg-black dark:bg-white {$page.route.id === '/profile_settings/filters' ? "" : 'collapse'}"></div>
            </li>
        </ul>
    </div>
    <slot/>
</div>