package test;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    public Item save(Item item) {
        return repository.save(item);
    }

    public void updateStatus(Long id, boolean isActive) {
        Item item = repository.findById(id).get();
        item.setActive(isActive);
        repository.save(item);
    }

    public void detete(Long id) {
        repository.findById(id).get();
        repository.deleteById(id);;
    }
}