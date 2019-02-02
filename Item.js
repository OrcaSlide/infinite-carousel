const ITEMS = `
<div class="Carousel__Item{ACTIVE}" id="{ID}">
    <a href="#" class="Items__ItemTypeA">
        <div class="Items__ItemTypeAThumbnail">
            <div class="Items__ItemTypeAImageContainer">
                <picture>
                    <source media="(min-width:0px) and (max-width:414px)" srcset="{ASSETS}.jpg">
                    <source media="(min-width:415px) and (max-width:768px)" srcset="{ASSETS}.jpg">
                    <source media="(min-width:769px)" srcset="{ASSETS}.jpg">
                    <img class="Items__ItemTypeAImage" src="{ASSETS}" alt="{ALT}">
                </picture>
            </div>
            <div class="Items__ItemTypeAVideoContainer">
                <div class="Items__ItemTypeAVideo">
                </div>
            </div>
            <div class="Items__ItemTypeAIconContainer">
                <div class="Items__ItemTypeAIcon">
                    <span class="Display">Display</span>
                </div>
            </div>
        </div>
        <div class="Items__ItemTypeACaption">
            <div class="Items__ItemTypeATitleContainer">
                <h3 class="Items__ItemTypeATitle">
                    When you delete something, you’re making a choice to destroy it. To never see it again.
                </h3>
            </div>
            <div class="Items__ItemTypeADescriptionContainer">
                <p class="Items__ItemTypeADescription">
                    Power belongs to the people that take it. Nothing to do with their hard work, strong ambitions, or rightful qualifications, no. The actual will to take is often the only thing that’s necessary.
                </p>
            </div>
            <div class="Items__ItemTypeADateContainer">
                <time class="Items__ItemTypeADate">
                    {DATE}
                </time>
            </div>
            <div class="Items__ItemTypeAAutorContainer">
                <span class="Items__ItemTypeAAutor">
                    {NAME}
                </span>
            </div>
            <div class="Items__ItemTypeALabelContainer">
                <span class="Items__ItemTypeALabel">
                    Ver Contenido
                </span>
            </div>
        </div>
    </a> <!-- End of Item Type A -->
</div>

`;
